import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// Rate limiting for messages
const messageRateLimit = new Map();
const MESSAGE_WINDOW = 1000; // 1 second
const MAX_MESSAGES = 5; // max messages per second

// Store active rooms and their users
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Rate limiting function
  const isRateLimited = (userId) => {
    const now = Date.now();
    const userMessages = messageRateLimit.get(userId) || [];
    const recentMessages = userMessages.filter(time => now - time < MESSAGE_WINDOW);
    
    messageRateLimit.set(userId, recentMessages);
    
    if (recentMessages.length >= MAX_MESSAGES) {
      return true;
    }
    
    recentMessages.push(now);
    messageRateLimit.set(userId, recentMessages);
    return false;
  };

  socket.on('join-room', ({ roomId, user }) => {
    if (!roomId || !user) return;
    
    socket.join(roomId);
    
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Map());
    }
    rooms.get(roomId).set(user.id, { ...user, socketId: socket.id });
    
    io.to(roomId).emit('user-joined', { roomId, user });
    io.to(roomId).emit('active-users', {
      roomId,
      users: Array.from(rooms.get(roomId).values())
    });
  });

  socket.on('leave-room', ({ roomId, userId }) => {
    if (!roomId || !userId) return;
    
    socket.leave(roomId);
    
    if (rooms.has(roomId)) {
      rooms.get(roomId).delete(userId);
      if (rooms.get(roomId).size === 0) {
        rooms.delete(roomId);
      }
    }
    
    io.to(roomId).emit('user-left', { roomId, userId });
    io.to(roomId).emit('active-users', {
      roomId,
      users: Array.from(rooms.get(roomId)?.values() || [])
    });
  });

  socket.on('chat-message', ({ roomId, message }) => {
    if (!message || !message.userId || isRateLimited(message.userId)) {
      return;
    }
    
    io.to(roomId).emit('chat-message', { roomId, message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    rooms.forEach((users, roomId) => {
      users.forEach((user, userId) => {
        if (user.socketId === socket.id) {
          users.delete(userId);
          io.to(roomId).emit('user-left', { roomId, userId });
        }
      });
      if (users.size === 0) {
        rooms.delete(roomId);
      }
    });
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
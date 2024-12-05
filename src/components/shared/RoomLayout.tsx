import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Video, MessageCircle, Users } from 'lucide-react';
import { useStore } from '../../store/useStore';
import Chat from '../Room/Chat';
import VideoCall from '../Room/VideoCall';
import MusicPlayer from '../Room/MusicPlayer';
import useRoomEntry from '../../hooks/useRoomEntry';

interface RoomLayoutProps {
  children: React.ReactNode;
  title: string;
  backgroundImage?: string;
  entryFee?: number;
  roomId: string;
  playlist?: Array<{
    title: string;
    artist: string;
    url: string;
  }>;
}

export default function RoomLayout({ 
  children, 
  title, 
  backgroundImage, 
  entryFee = 10,
  roomId,
  playlist = []
}: RoomLayoutProps) {
  const navigate = useNavigate();
  const { currentUser, activeUsers } = useStore();
  const { canEnterRoom } = useRoomEntry(roomId, entryFee);

  const handleBackToRooms = useCallback(() => {
    navigate('/rooms');
  }, [navigate]);

  if (!currentUser || !canEnterRoom) {
    return null;
  }

  const validChannelName = roomId.replace(/[^a-zA-Z0-9]/g, '');
  const roomUsers = activeUsers[roomId] || [];

  return (
    <div className="min-h-screen bg-gray-900">
      {backgroundImage && (
        <div className="fixed inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        </div>
      )}

      <div className="relative z-10 p-4 pt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Video className="w-6 h-6 mr-2" />
                  Video Chat
                </h2>
                <button
                  onClick={handleBackToRooms}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
                >
                  Back to Rooms
                </button>
              </div>
              <VideoCall channelName={validChannelName} userId={currentUser.id} />
            </div>

            {playlist.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <h2 className="text-xl font-bold mb-4 flex items-center text-white">
                  <Music className="w-6 h-6 mr-2" />
                  Room Music
                </h2>
                <MusicPlayer roomId={roomId} playlist={playlist} />
              </div>
            )}

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4 flex items-center text-white">
                <Music className="w-6 h-6 mr-2" />
                {title}
              </h2>
              {children}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4 flex items-center text-white">
                <Users className="w-6 h-6 mr-2" />
                Active Users ({roomUsers.length})
              </h2>
              <div className="space-y-2">
                {roomUsers.map((user) => (
                  <div key={user.id} className="flex items-center space-x-2 text-white">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{user.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4 flex items-center text-white">
                <MessageCircle className="w-6 h-6 mr-2" />
                Room Chat
              </h2>
              <Chat roomId={roomId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
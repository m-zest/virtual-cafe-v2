import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RoomView from './components/Room/RoomView';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import ProfilePage from './pages/ProfilePage';
import CreateRoomPage from './pages/CreateRoomPage';
import FitnessRoom from './components/rooms/FitnessRoom';
import BookRoom from './components/rooms/BookRoom';
import PhotoRoom from './components/rooms/PhotoRoom';
import GameRoom from './components/rooms/GameRoom';
import AuthGuard from './components/AuthGuard';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/room/:roomId" element={<AuthGuard><RoomView /></AuthGuard>} />
          <Route path="/profile" element={<AuthGuard><ProfilePage /></AuthGuard>} />
          <Route path="/create-room" element={<AuthGuard><CreateRoomPage /></AuthGuard>} />
          <Route path="/fitness" element={<AuthGuard><FitnessRoom /></AuthGuard>} />
          <Route path="/books" element={<AuthGuard><BookRoom /></AuthGuard>} />
          <Route path="/photos" element={<AuthGuard><PhotoRoom /></AuthGuard>} />
          <Route path="/games" element={<AuthGuard><GameRoom /></AuthGuard>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
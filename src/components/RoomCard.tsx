import React, { useState } from 'react';
import { Users, Coffee, Gamepad, Beer, Briefcase, Palette, Book, Music, Camera, Dumbbell, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import AuthModal from './AuthModal';

interface RoomCardProps {
  title: string;
  description: string;
  icon: string;
  activeUsers: number;
  bgImage: string;
  entryFee: number;
  category: string;
  route: string;
}

const icons = {
  business: Briefcase,
  friends: Users,
  games: Gamepad,
  german: Beer,
  english: Coffee,
  art: Palette,
  book: Book,
  music: Music,
  photo: Camera,
  fitness: Dumbbell
} as const;

export default function RoomCard({ 
  title, 
  description, 
  icon, 
  activeUsers, 
  bgImage, 
  entryFee, 
  category,
  route 
}: RoomCardProps) {
  const navigate = useNavigate();
  const { currentUser } = useStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = icons[icon as keyof typeof icons];
  
  const handleJoinRoom = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    if (currentUser.balance < entryFee) {
      alert(`Insufficient balance. You need ${entryFee} coins to enter this room.`);
      return;
    }

    navigate(route);
  };
  
  return (
    <>
      <div 
        className="relative group rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        style={{ height: '400px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
          style={{
            backgroundImage: `url(${bgImage})`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white">
            {category}
          </span>
        </div>

        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
          <div className="flex items-center justify-between mb-4">
            <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                {activeUsers} online
              </span>
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Coins className="w-4 h-4" />
                {entryFee}
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-gray-200 mb-6">{description}</p>
          <button 
            onClick={handleJoinRoom}
            className="w-full bg-white/90 backdrop-blur-sm text-gray-900 py-3 rounded-lg hover:bg-white transition-colors duration-300 font-semibold"
          >
            Join Room
          </button>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
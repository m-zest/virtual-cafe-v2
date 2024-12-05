import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, LogOut, User, Coins } from 'lucide-react';
import { useStore } from '../store/useStore';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { currentUser, setCurrentUser } = useStore();

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3">
                <Coffee className="w-8 h-8 text-indigo-600" />
                <span className="text-xl font-bold text-gray-900">Virtual Café</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Coins className="w-5 h-5" />
                    <span>${currentUser.balance}</span>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  >
                    <User className="w-5 h-5" />
                    <span>{currentUser.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                  Join Now
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
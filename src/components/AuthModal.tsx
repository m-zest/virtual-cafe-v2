import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [name, setName] = useState('');
  const { setCurrentUser } = useStore();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const userId = Math.random().toString(36).substr(2, 9);
    
    setCurrentUser({
      id: userId,
      name: name.trim(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
      balance: 100,
      ownedRooms: [],
    });
    
    onClose();
    setName(''); // Reset form
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Join Virtual Café</h2>
        <p className="text-gray-600 mb-4">
          Get 100 coins on signup to explore our virtual rooms!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Join Now
          </button>
        </form>
      </div>
    </div>
  );
}
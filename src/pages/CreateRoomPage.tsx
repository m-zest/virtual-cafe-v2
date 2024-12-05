import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function CreateRoomPage() {
  const navigate = useNavigate();
  const { currentUser, createRoom } = useStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    entryFee: 5,
    bgImage: '',
    ambientVideo: '',
  });

  if (!currentUser) {
    navigate('/');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const roomId = Math.random().toString(36).substr(2, 9);

    createRoom({
      id: roomId,
      ...formData,
      ownerId: currentUser.id,
      icon: 'custom',
      theme: {
        music: ['Custom Playlist 1', 'Custom Playlist 2'],
        ambientVideo: formData.ambientVideo,
      },
    });

    navigate('/rooms');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Create Your Room</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Room Name</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Entry Fee (coins)</label>
            <input
              type="number"
              value={formData.entryFee}
              onChange={(e) => setFormData({ ...formData, entryFee: Number(e.target.value) })}
              className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Background Image URL</label>
            <input
              type="url"
              value={formData.bgImage}
              onChange={(e) => setFormData({ ...formData, bgImage: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20"
              placeholder="https://images.unsplash.com/..."
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Ambient Video URL (optional)</label>
            <input
              type="url"
              value={formData.ambientVideo}
              onChange={(e) => setFormData({ ...formData, ambientVideo: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20"
              placeholder="https://example.com/video.mp4"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
}
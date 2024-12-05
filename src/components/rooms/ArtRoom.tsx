import React, { useState } from 'react';
import { Palette, Share2, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const artCategories = ['Paintings', 'Digital Art', 'Sculptures', 'Photography', 'Mixed Media'];

const artworks = [
  {
    id: 1,
    title: 'Abstract Harmony',
    artist: 'Emma Chen',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262',
    category: 'Paintings',
    likes: 245,
    comments: 18
  },
  {
    id: 2,
    title: 'Digital Dreams',
    artist: 'Alex Rivera',
    imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5',
    category: 'Digital Art',
    likes: 189,
    comments: 12
  },
  {
    id: 3,
    title: 'Urban Perspectives',
    artist: 'Sarah Kim',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f',
    category: 'Photography',
    likes: 321,
    comments: 24
  }
];

export default function ArtRoom() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Categories */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              activeCategory === 'All'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            All Artwork
          </button>
          {artCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks
            .filter(
              (artwork) =>
                activeCategory === 'All' || artwork.category === activeCategory
            )
            .map((artwork) => (
              <motion.div
                key={artwork.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 rounded-lg overflow-hidden"
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {artwork.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    by {artwork.artist}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-white/70 hover:text-white">
                        <Heart className="w-4 h-4" />
                        <span>{artwork.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-white/70 hover:text-white">
                        <MessageCircle className="w-4 h-4" />
                        <span>{artwork.comments}</span>
                      </button>
                    </div>
                    <button className="flex items-center gap-1 text-white/70 hover:text-white">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
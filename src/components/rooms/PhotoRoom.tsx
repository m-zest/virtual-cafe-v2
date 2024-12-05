import React, { useState } from 'react';
import { Camera, Heart, Share2, MessageCircle } from 'lucide-react';
import { photographyContent } from '../../config/content/photography';
import { motion } from 'framer-motion';
import RoomLayout from '../shared/RoomLayout';

export default function PhotoRoom() {
  const [selectedGallery, setSelectedGallery] = useState(photographyContent.galleries[0]);
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <RoomLayout 
      title="Photography Hub" 
      backgroundImage="https://images.unsplash.com/photo-1452587925148-ce544e77e70d"
      entryFee={12}
      roomId="photos"
    >
      <div className="space-y-6">
        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              activeCategory === 'All'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            All Photos
          </button>
          {photographyContent.categories.map((category) => (
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

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {photographyContent.galleries
            .filter(
              (gallery) =>
                activeCategory === 'All' ||
                gallery.title.includes(activeCategory)
            )
            .map((gallery) =>
              gallery.photos.map((photo) => (
                <motion.div
                  key={photo.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 rounded-lg overflow-hidden"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {photo.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-2">
                      by {photo.photographer}
                    </p>
                    <p className="text-white/70 text-sm mb-4">
                      {photo.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-white/70 hover:text-white">
                          <Heart className="w-4 h-4" />
                          <span>24</span>
                        </button>
                        <button className="flex items-center gap-1 text-white/70 hover:text-white">
                          <MessageCircle className="w-4 h-4" />
                          <span>12</span>
                        </button>
                      </div>
                      <button className="flex items-center gap-1 text-white/70 hover:text-white">
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
        </div>
      </div>
    </RoomLayout>
  );
}
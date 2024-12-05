import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Shirt, User, Camera } from 'lucide-react';
import { useStore } from '../../store/useStore';

const avatarFeatures = {
  style: ['default', 'circle', 'pixel'],
  hair: ['long', 'short', 'curly', 'straight'],
  accessories: ['glasses', 'hat', 'earrings'],
  clothing: ['casual', 'formal', 'creative'],
} as const;

export default function AvatarCustomization() {
  const { currentUser, updateUserAvatar } = useStore();
  const [activeTab, setActiveTab] = useState<keyof typeof avatarFeatures>('style');
  const [selectedFeatures, setSelectedFeatures] = useState({
    style: 'default',
    hair: 'short',
    accessories: [],
    clothing: 'casual',
  });

  const updateFeature = (category: string, value: string) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [category]: value,
    }));

    // Generate new avatar URL with selected features
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.id}&style=${selectedFeatures.style}&hair=${selectedFeatures.hair}&clothing=${selectedFeatures.clothing}`;
    updateUserAvatar(avatarUrl);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Customize Your Avatar</h2>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('style')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'style' ? 'bg-indigo-600 text-white' : 'bg-white/5 text-white/70'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Style</span>
        </button>
        <button
          onClick={() => setActiveTab('hair')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'hair' ? 'bg-indigo-600 text-white' : 'bg-white/5 text-white/70'
          }`}
        >
          <Camera className="w-5 h-5" />
          <span>Hair</span>
        </button>
        <button
          onClick={() => setActiveTab('clothing')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'clothing' ? 'bg-indigo-600 text-white' : 'bg-white/5 text-white/70'
          }`}
        >
          <Shirt className="w-5 h-5" />
          <span>Clothing</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {avatarFeatures[activeTab].map((feature) => (
          <motion.button
            key={feature}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => updateFeature(activeTab, feature)}
            className={`p-4 rounded-lg text-white transition-colors ${
              selectedFeatures[activeTab] === feature
                ? 'bg-indigo-600'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            {feature}
          </motion.button>
        ))}
      </div>

      <div className="mt-6">
        <img
          src={currentUser?.avatar}
          alt="Your Avatar"
          className="w-32 h-32 rounded-full mx-auto border-4 border-white/20"
        />
      </div>
    </div>
  );
}
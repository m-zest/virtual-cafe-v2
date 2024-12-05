import React, { useState } from 'react';
import { Gamepad, Users, Trophy, Play } from 'lucide-react';
import { gameContent } from '../../config/content/games';
import { motion } from 'framer-motion';
import RoomLayout from '../shared/RoomLayout';

export default function GameRoom() {
  const [selectedGame, setSelectedGame] = useState(gameContent.games[0]);
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <RoomLayout 
      title="Gaming Lounge" 
      backgroundImage="https://images.unsplash.com/photo-1511512578047-dfb367046420"
      entryFee={20}
      roomId="games"
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
            All Games
          </button>
          {gameContent.categories.map((category) => (
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

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gameContent.games.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{game.title}</h3>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-white/70" />
                  <span className="text-white/70">
                    {game.maxPlayers} players
                  </span>
                </div>
              </div>
              <p className="text-white/70 mb-6">{game.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <Play className="w-4 h-4" />
                    Play Now
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30">
                    <Trophy className="w-4 h-4" />
                    Leaderboard
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </RoomLayout>
  );
}
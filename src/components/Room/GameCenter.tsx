import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad, Users, Trophy } from 'lucide-react';

const games = [
  {
    id: 'trivia',
    name: 'Café Trivia',
    players: '2-8',
    description: 'Test your knowledge about coffee, food, and culture!',
    icon: '🎯',
  },
  {
    id: 'cards',
    name: 'Card Games',
    players: '2-4',
    description: 'Classic card games to play with friends',
    icon: '🃏',
  },
  {
    id: 'word',
    name: 'Word Chain',
    players: '2-6',
    description: 'Create words using the last letter of the previous word',
    icon: '📝',
  },
];

export default function GameCenter() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState([
    { name: 'Player 1', score: 1200 },
    { name: 'Player 2', score: 950 },
    { name: 'Player 3', score: 800 },
  ]);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Gamepad className="w-6 h-6 mr-2" />
        Game Center
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {games.map((game) => (
          <motion.button
            key={game.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedGame(game.id)}
            className={`p-6 rounded-lg text-left transition-colors ${
              selectedGame === game.id
                ? 'bg-indigo-600 text-white'
                : 'bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            <div className="text-3xl mb-2">{game.icon}</div>
            <h3 className="text-lg font-semibold mb-1">{game.name}</h3>
            <div className="flex items-center text-sm opacity-70 mb-2">
              <Users className="w-4 h-4 mr-1" />
              {game.players} players
            </div>
            <p className="text-sm opacity-80">{game.description}</p>
          </motion.button>
        ))}
      </div>

      <div className="bg-white/5 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          Leaderboard
        </h3>
        <div className="space-y-2">
          {leaderboard.map((player, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg bg-white/5"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <span className="ml-3 text-white">{player.name}</span>
              </div>
              <span className="text-indigo-400 font-semibold">{player.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
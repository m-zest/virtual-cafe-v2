import React, { useState } from 'react';
import { Play, Calendar, Trophy, User } from 'lucide-react';
import { fitnessContent } from '../../config/content/fitness';
import { motion } from 'framer-motion';
import RoomLayout from '../shared/RoomLayout';

export default function FitnessRoom() {
  const [selectedWorkout, setSelectedWorkout] = useState(fitnessContent.workouts[0]);
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <RoomLayout 
      title="Fitness Zone" 
      backgroundImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
      entryFee={15}
      roomId="fitness"
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
            All Workouts
          </button>
          {fitnessContent.categories.map((category) => (
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

        {/* Workout List */}
        <div className="grid grid-cols-1 gap-4">
          {fitnessContent.workouts
            .filter(
              (workout) =>
                activeCategory === 'All' || workout.category === activeCategory
            )
            .map((workout) => (
              <motion.div
                key={workout.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedWorkout.id === workout.id
                    ? 'bg-indigo-600'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                onClick={() => setSelectedWorkout(workout)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {workout.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-2">
                      {workout.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {workout.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {workout.instructor}
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        {workout.level}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 bg-white/20 rounded-full">
                    <Play className="w-5 h-5 text-white" />
                  </button>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Video Player */}
        {selectedWorkout && (
          <div className="bg-white/10 rounded-lg p-4">
            <div className="aspect-video mb-4">
              <iframe
                src={selectedWorkout.videoUrl}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              {selectedWorkout.title}
            </h2>
            <p className="text-white/70">{selectedWorkout.description}</p>
          </div>
        )}
      </div>
    </RoomLayout>
  );
}
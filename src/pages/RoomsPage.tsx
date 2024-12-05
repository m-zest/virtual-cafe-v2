import React, { useState } from 'react';
import RoomCard from '../components/RoomCard';
import { Coffee, Search, Filter } from 'lucide-react';
import { defaultRooms } from '../config/rooms';

const categories = ['All', 'Social', 'Learning', 'Entertainment', 'Wellness'] as const;

const rooms = [
  {
    title: defaultRooms.business.title,
    description: 'Professional networking space for entrepreneurs and remote workers.',
    icon: 'business',
    activeUsers: 24,
    bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
    entryFee: defaultRooms.business.entryFee,
    category: 'Social',
    route: '/room/business'
  },
  {
    title: defaultRooms.friends.title,
    description: 'Casual hangout spot for meeting new people and catching up with friends.',
    icon: 'friends',
    activeUsers: 42,
    bgImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205',
    entryFee: defaultRooms.friends.entryFee,
    category: 'Social',
    route: '/room/friends'
  },
  {
    title: defaultRooms.fitness.title,
    description: 'Join live workout sessions and track your fitness progress.',
    icon: 'fitness',
    activeUsers: 33,
    bgImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
    entryFee: defaultRooms.fitness.entryFee,
    category: 'Wellness',
    route: '/fitness'
  },
  {
    title: defaultRooms.books.title,
    description: 'Discuss your favorite books and discover new reads.',
    icon: 'book',
    activeUsers: 22,
    bgImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570',
    entryFee: defaultRooms.books.entryFee,
    category: 'Learning',
    route: '/books'
  },
  {
    title: defaultRooms.photos.title,
    description: 'Share your photos, get feedback, and learn new techniques.',
    icon: 'photo',
    activeUsers: 27,
    bgImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d',
    entryFee: defaultRooms.photos.entryFee,
    category: 'Learning',
    route: '/photos'
  },
  {
    title: defaultRooms.games.title,
    description: 'Play games, share strategies, and connect with fellow gamers.',
    icon: 'games',
    activeUsers: 38,
    bgImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
    entryFee: defaultRooms.games.entryFee,
    category: 'Entertainment',
    route: '/games'
  },
  {
    title: defaultRooms.art.title,
    description: 'Share your artwork, discuss techniques, and get inspired.',
    icon: 'art',
    activeUsers: 18,
    bgImage: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b',
    entryFee: defaultRooms.art.entryFee,
    category: 'Entertainment',
    route: '/art'
  }
];

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'price'>('popular');

  const filteredRooms = rooms
    .filter(room => {
      const matchesSearch = room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          room.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || room.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') {
        return b.activeUsers - a.activeUsers;
      }
      return a.entryFee - b.entryFee;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <div className="flex items-center gap-3">
            <Coffee className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white text-center">Virtual Café</h1>
          </div>
          <p className="text-gray-400 text-center max-w-2xl">
            Join our themed rooms for meaningful conversations, skill sharing, and making new friends
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'price')}
                className="bg-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="popular">Most Popular</option>
                <option value="price">Lowest Price</option>
              </select>
            </div>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard 
              key={room.title} 
              {...room} 
              route={room.route}
            />
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p>No rooms found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
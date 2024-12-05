import React, { useState } from 'react';
import { Calendar, Clock, Users, Music, Video, Book } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Event } from '../../types/room';

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Live Jazz Night',
    description: 'Enjoy smooth jazz with our house band',
    startTime: new Date('2024-03-15T20:00:00'),
    endTime: new Date('2024-03-15T22:00:00'),
    type: 'music',
    host: 'Jazz Ensemble',
    participants: [],
    maxParticipants: 50
  },
  {
    id: '2',
    title: 'Coffee Brewing Workshop',
    description: 'Learn the art of perfect coffee brewing',
    startTime: new Date('2024-03-16T15:00:00'),
    endTime: new Date('2024-03-16T16:30:00'),
    type: 'workshop',
    host: 'Master Barista',
    participants: [],
    maxParticipants: 20
  }
];

const eventIcons = {
  music: Music,
  talk: Video,
  game: Calendar,
  workshop: Book
};

export default function EventSchedule() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Calendar className="w-6 h-6 mr-2" />
        Upcoming Events
      </h2>

      <div className="space-y-4">
        {upcomingEvents.map((event) => {
          const EventIcon = eventIcons[event.type];
          return (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg transition-colors cursor-pointer ${
                selectedEvent?.id === event.id
                  ? 'bg-indigo-600'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
              onClick={() => setSelectedEvent(event)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <EventIcon className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-lg font-semibold text-white">
                      {event.title}
                    </h3>
                  </div>
                  <p className="text-white/70 text-sm mb-2">{event.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatTime(event.startTime)}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {event.participants.length}/{event.maxParticipants}
                    </div>
                  </div>
                </div>
                <button
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle RSVP logic
                  }}
                >
                  RSVP
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {upcomingEvents.length === 0 && (
        <p className="text-center text-white/60">No upcoming events scheduled</p>
      )}
    </div>
  );
}
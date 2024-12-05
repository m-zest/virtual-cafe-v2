import React, { useState } from 'react';
import { Book, Download, BookOpen, Users } from 'lucide-react';
import { bookContent } from '../../config/content/books';
import { motion } from 'framer-motion';
import RoomLayout from '../shared/RoomLayout';

export default function BookRoom() {
  const [selectedBook, setSelectedBook] = useState(bookContent.ebooks[0]);
  const [activeGenre, setActiveGenre] = useState('All');

  return (
    <RoomLayout 
      title="Book Club" 
      backgroundImage="https://images.unsplash.com/photo-1481627834876-b7833e8f5570"
      entryFee={8}
      roomId="books"
    >
      <div className="space-y-6">
        {/* Genres */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveGenre('All')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              activeGenre === 'All'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            All Books
          </button>
          {bookContent.genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeGenre === genre
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Book List */}
        <div className="grid grid-cols-1 gap-4">
          {bookContent.ebooks
            .filter(
              (book) => activeGenre === 'All' || book.genre === activeGenre
            )
            .map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedBook.id === book.id
                    ? 'bg-indigo-600'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                onClick={() => setSelectedBook(book)}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-24 h-36 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {book.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-2">
                      by {book.author}
                    </p>
                    <p className="text-white/70 text-sm mb-4">
                      {book.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <a
                        href={book.downloadUrl}
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30">
                        <BookOpen className="w-4 h-4" />
                        Read Online
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Book Club Section */}
        <div className="bg-white/10 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Book Club
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <h3 className="font-semibold text-white mb-2">
                Current Reading
              </h3>
              <p className="text-white/70 text-sm">
                Join our weekly discussion about "{selectedBook.title}" by{' '}
                {selectedBook.author}
              </p>
              <button className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Join Discussion
              </button>
            </div>
          </div>
        </div>
      </div>
    </RoomLayout>
  );
}
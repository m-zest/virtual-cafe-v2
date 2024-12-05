import React from 'react';

interface EmojiPickerProps {
  onSelectEmoji: (emoji: string) => void;
}

const emojis = ['☕️', '🎮', '🎵', '🎲', '🎨', '📚', '🎭', '🎪', '🎯', '🎸'];

export default function EmojiPicker({ onSelectEmoji }: EmojiPickerProps) {
  return (
    <div className="p-2 bg-white/5 border-t border-white/10">
      <div className="flex gap-2 flex-wrap">
        {emojis.map(emoji => (
          <button
            key={emoji}
            onClick={() => onSelectEmoji(emoji)}
            className="text-2xl hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
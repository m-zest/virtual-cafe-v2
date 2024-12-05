import React, { useState } from 'react';
import { Send, SmilePlus } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onToggleEmojis: () => void;
}

export default function ChatInput({ onSendMessage, onToggleEmojis }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    
    onSendMessage(trimmedMessage);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-white/10">
      <div className="flex space-x-2">
        <button 
          onClick={onToggleEmojis}
          className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          aria-label="Toggle emoji picker"
        >
          <SmilePlus className="w-5 h-5" />
        </button>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          rows={1}
        />
        <button
          onClick={handleSend}
          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!message.trim()}
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
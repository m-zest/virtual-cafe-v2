import React, { useState } from 'react';
import { Send, SmilePlus } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  onToggleEmojis: () => void;
}

export default function MessageInput({ onSendMessage, onToggleEmojis }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message.trim());
    setMessage('');
  };

  return (
    <div className="p-4 border-t border-white/10">
      <div className="flex space-x-2">
        <button 
          onClick={onToggleEmojis}
          className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
        >
          <SmilePlus className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
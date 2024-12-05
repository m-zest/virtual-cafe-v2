import React from 'react';
import { motion } from 'framer-motion';
import { formatMessageTime } from '../../../utils/dateUtils';
import type { Message } from '../../../types/chat';

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
}

export default function ChatMessage({ message, isCurrentUser }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className="flex items-start space-x-2 max-w-[70%]">
        {!isCurrentUser && (
          <img
            src={message.userAvatar}
            alt={message.userName}
            className="w-8 h-8 rounded-full"
          />
        )}
        <div
          className={`rounded-lg p-3 ${
            isCurrentUser
              ? 'bg-indigo-600 text-white'
              : 'bg-white/10 text-white'
          }`}
        >
          {!isCurrentUser && (
            <p className="text-sm font-medium mb-1">{message.userName}</p>
          )}
          <p className="break-words">{message.content}</p>
          <span className="text-xs opacity-75 mt-1 block">
            {formatMessageTime(message.timestamp)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
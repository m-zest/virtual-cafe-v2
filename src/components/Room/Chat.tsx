import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import ChatMessage from './Chat/ChatMessage';
import ChatInput from './Chat/ChatInput';
import EmojiPicker from './Chat/EmojiPicker';
import { createMessage } from '../../utils/messageUtils';
import type { Message } from '../../types/chat';

interface ChatProps {
  roomId: string;
}

export default function Chat({ roomId }: ChatProps) {
  const [showEmojis, setShowEmojis] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const { currentUser, messages, addMessage } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const sortedMessages = messages[roomId] || [];

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setAutoScroll(isNearBottom);
  };

  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sortedMessages, autoScroll]);

  const handleSendMessage = (content: string) => {
    if (!currentUser || !content.trim()) return;

    const newMessage = createMessage(content.trim(), currentUser);
    addMessage(roomId, newMessage);
    setAutoScroll(true);
  };

  const handleEmojiSelect = (emoji: string) => {
    handleSendMessage(emoji);
    setShowEmojis(false);
  };

  if (!currentUser) return null;

  return (
    <div className="flex flex-col h-[500px] bg-gray-900/50 rounded-lg">
      <div 
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
      >
        {sortedMessages.map((message: Message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isCurrentUser={message.userId === currentUser.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showEmojis && (
        <EmojiPicker onSelectEmoji={handleEmojiSelect} />
      )}

      <ChatInput
        onSendMessage={handleSendMessage}
        onToggleEmojis={() => setShowEmojis(!showEmojis)}
      />
    </div>
  );
}
import { nanoid } from 'nanoid';
import type { Message } from '../types/chat';
import type { User } from '../types/user';

export function createMessage(content: string, user: User): Message {
  return {
    id: nanoid(),
    userId: user.id,
    userName: user.name,
    userAvatar: user.avatar,
    content,
    timestamp: Date.now(),
  };
}

export function sortMessagesByTimestamp(messages: Message[]): Message[] {
  return [...messages].sort((a, b) => a.timestamp - b.timestamp);
}
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message } from '../types/chat';
import type { User } from '../types/user';
import type { Room } from '../types/room';

interface AppState {
  currentUser: User | null;
  messages: Record<string, Message[]>;
  activeUsers: Record<string, User[]>;
  customRooms: Room[];
  setCurrentUser: (user: User | null) => void;
  updateUserAvatar: (avatar: string) => void;
  updateBalance: (amount: number) => void;
  addMessage: (roomId: string, message: Message) => void;
  addUserToRoom: (roomId: string, user: User) => void;
  removeUserFromRoom: (roomId: string, userId: string) => void;
  createRoom: (room: Room) => void;
  deleteRoom: (roomId: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: null,
      messages: {},
      activeUsers: {},
      customRooms: [],
      setCurrentUser: (user) => set({ currentUser: user }),
      updateUserAvatar: (avatar) => 
        set((state) => ({
          currentUser: state.currentUser 
            ? { ...state.currentUser, avatar }
            : null
        })),
      updateBalance: (amount) =>
        set((state) => ({
          currentUser: state.currentUser
            ? { ...state.currentUser, balance: state.currentUser.balance + amount }
            : null,
        })),
      addMessage: (roomId, message) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [roomId]: [...(state.messages[roomId] || []), message],
          },
        })),
      addUserToRoom: (roomId, user) =>
        set((state) => ({
          activeUsers: {
            ...state.activeUsers,
            [roomId]: [...(state.activeUsers[roomId] || []).filter(u => u.id !== user.id), user],
          },
        })),
      removeUserFromRoom: (roomId, userId) =>
        set((state) => ({
          activeUsers: {
            ...state.activeUsers,
            [roomId]: (state.activeUsers[roomId] || []).filter((u) => u.id !== userId),
          },
        })),
      createRoom: (room) =>
        set((state) => ({
          customRooms: [...state.customRooms, room],
          currentUser: state.currentUser
            ? {
                ...state.currentUser,
                ownedRooms: [...state.currentUser.ownedRooms, room.id],
              }
            : null,
        })),
      deleteRoom: (roomId) =>
        set((state) => ({
          customRooms: state.customRooms.filter((room) => room.id !== roomId),
          currentUser: state.currentUser
            ? {
                ...state.currentUser,
                ownedRooms: state.currentUser.ownedRooms.filter((id) => id !== roomId),
              }
            : null,
        })),
    }),
    {
      name: 'virtual-cafe-storage',
    }
  )
);
import { create } from 'zustand';
import { User, Notification } from '../types';

interface Store {
  user: User | null;
  darkMode: boolean;
  notifications: Notification[];
  setUser: (user: User | null) => void;
  toggleDarkMode: () => void;
  addNotification: (notification: Notification) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  darkMode: false,
  notifications: [
    { id: 1, message: 'Se ha validado la investigación', date: '2024-03-15' },
    { id: 2, message: 'Nueva secuencia didáctica disponible', date: '2024-03-14' }
  ],
  setUser: (user) => set({ user }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  addNotification: (notification) => 
    set((state) => ({ notifications: [...state.notifications, notification] })),
}));
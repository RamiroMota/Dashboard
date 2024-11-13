import { create } from 'zustand';
import { User, Notification } from '../types';

interface Store {
  user: User | null;
  token: string | null; // Aquí guardamos el token
  darkMode: boolean;
  notifications: Notification[];
  
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void; // Nueva función para guardar el token
  toggleDarkMode: () => void;
  addNotification: (notification: Notification) => void;
  logout: () => void; // Función para limpiar los datos al hacer logout
}

export const useStore = create<Store>((set) => ({
  user: null,
  token: null,
  darkMode: false,
  notifications: [
    { id: 1, message: 'Se ha validado la investigación', date: '2024-03-15', read: false },
    { id: 2, message: 'Nueva secuencia didáctica disponible', date: '2024-03-14', read: false },
  ],
  role: null,
  setUser: (user) => {
    set({ user });
  },
  setToken: (token) => set({ token }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  addNotification: (notification) => set((state) => ({ notifications: [...state.notifications, notification] })),
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
    if (localStorage.getItem('user') === null && localStorage.getItem('token') === null) {
      console.log('Datos de usuario eliminados con éxito');
      // Redirige al usuario a la página de login
    } else {
      console.log('Error al eliminar los datos de usuario');
    }
  },
}));
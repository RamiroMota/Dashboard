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
  token: null, // Inicialmente no hay token
  darkMode: false,
  notifications: [
    { id: 1, message: 'Se ha validado la investigación', date: '2024-03-15', read: false },
    { id: 2, message: 'Nueva secuencia didáctica disponible', date: '2024-03-14', read: false },
  ],
  
  // Función para establecer el usuario
  setUser: (user) => {
    set({ user });
  },

  
  // Función para establecer el token
  setToken: (token) => set({ token }),

  // Función para alternar entre el modo oscuro
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  
  // Función para agregar una nueva notificación
  addNotification: (notification) => 
    set((state) => ({ notifications: [...state.notifications, notification] })),
  
  // Función para hacer logout y limpiar los datos
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
  }
}));
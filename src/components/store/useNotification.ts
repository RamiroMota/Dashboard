import { useState, useEffect } from 'react';

// Hook para manejar el estado de notificaciones
export const useNotification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Función para alternar la visibilidad del popup de notificaciones
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  // Función para alternar la visibilidad del popup de perfil
  const toggleProfile = () => setShowProfile(!showProfile);

  // Cierra el popup si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest('#notification-popup') && showNotifications) {
        setShowNotifications(false);
      }
      if (!target.closest('#profile-popup') && showProfile) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showProfile]);

  return { showNotifications, toggleNotifications, showProfile, toggleProfile };
};
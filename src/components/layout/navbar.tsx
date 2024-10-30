import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bell, Sun, Moon, User, Menu, LogOut, ChevronRight, Home } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNotification } from '../store/useNotification';
type NavbarProps = {
  toggleSidebar: () => void; // Define el tipo de la propiedad toggleSidebar como una función que no recibe argumentos y devuelve void
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const { darkMode, toggleDarkMode, notifications, user } = useStore();
  const { showNotifications, toggleNotifications, showProfile, toggleProfile } = useNotification();

  // Mapeo de rutas a nombres legibles
  const routeNames = {
    "dir-investigacion": "Dirección de Investigación",
    "gestion-invest": "Gestión de Investigaciones",
    "estado-invest": "Estado de Investigaciones",
    "dir-academica": "Dirección Académica",
    "secuencia": "Secuencia Didáctica",
    "configpub": "Configuración"
  };

  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    return paths.map((path, index) => ({
      label: routeNames[path as keyof typeof routeNames] || path.charAt(0).toUpperCase() + path.slice(1),
      path: `/${paths.slice(0, index + 1).join('/')}`
    }));
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button type="button" onClick={toggleSidebar} className="p-2 rounded-md lg:hidden">
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-200" />
            </button>
            <div className="hidden sm:flex items-center space-x-2 ml-4 text-gray-600 dark:text-gray-200">
              <Link to="/" className="flex items-center">
                <Home className="h-4 w-4 mr-1" />
                Inicio
              </Link>
              {getBreadcrumbs().map((item, index) => (
                <div key={item.path} className="flex items-center">
                  <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
                  <Link to={item.path} className={`ml-2 hover:text-blue-500 transition duration-200 ${index === getBreadcrumbs().length - 1 ? 'font-bold' : ''}`}>
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button type="button" onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              {darkMode ? <Sun className="h-6 w-6 text-gray-600 dark:text-gray-200" /> : <Moon className="h-6 w-6 text-gray-600 dark:text-gray-200" />}
              </button>
              <button type="button" onClick={toggleNotifications} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell className="h-6 w-6 text-gray-600 dark:text-gray-200" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div id="notification-popup" className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-lg pb-2 z-50 border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-blue-400 dark:bg-gray-800 rounded-t-lg">
                    <h3 className="text-sm font-semibold text-white">Notificaciones</h3>
                  </div>
                  {/* Aquí pueden ir las notificaciones automáticas */}
                  <div>
                    {/* Mensajes de notificaciones */}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button type="button" onClick={toggleProfile} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <User className="h-6 w-6 text-gray-600 dark:text-gray-200" />
              </button>

              {showProfile && (
                <div id="profile-popup" className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-medium text-gray-800 dark:text-white">
                      {user?.name || 'Fernando Arreola'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.email || 'example@abc.com'}
                    </p>
                    <span className="inline-block px-2 py-1 mt-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-md">
                      {user?.role || 'Docente'}
                    </span>
                  </div>
                  <Link to="/login" className="flex items-center px-4 py-2 text-red-600 font-semibold bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-b-lg">
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar sesión
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import{ useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Bell, 
  Sun, 
  Moon, 
  User, 
  Menu,
  LogOut,
  ChevronRight 
} from 'lucide-react';
import { useStore } from '../store/useStore';

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const { darkMode, toggleDarkMode, notifications, user } = useStore();

  // Mapeo de rutas a nombres legibles
  const routeNames: { [key: string]: string } = {
    "dir-investigacion": "Dirección de Investigación",
    "dir-academica": "Dirección Académica",
    "secuencia": "Secuencia Didáctica",
    "configpub":"Configuración"
    // Agrega más rutas según sea necesario
  };

  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    return paths.map((path, index) => ({
      label: routeNames[path] || path.charAt(0).toUpperCase() + path.slice(1), // Usa el mapeo o la forma por defecto
      path: '/' + paths.slice(0, index + 1).join('/')
    }));
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md lg:hidden"
            >
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-200" />
            </button>

            <div className="hidden sm:flex items-center space-x-2 ml-4">
              <Link to="/" className="text-gray-600 dark:text-gray-200">
                Inicio
              </Link>
              {getBreadcrumbs().map((item, index) => (
                <div key={index} className="flex items-center">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <Link
                    to={item.path}
                    className="ml-2 text-gray-600 dark:text-gray-200"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Bell className="h-6 w-6 text-gray-600 dark:text-gray-200" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                {notifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${index !== notifications.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-200">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400">{notification.date}</p>
                  </div>
                ))}
              </div>
            )}
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <Sun className="h-6 w-6 text-gray-600 dark:text-gray-200" />
              ) : (
                <Moon className="h-6 w-6 text-gray-600 dark:text-gray-200" />
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <User className="h-6 w-6 text-gray-600 dark:text-gray-200" />
              </button>

              {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-medium text-gray-800 dark:text-white">
                    {user?.name || 'Fernando Arreola'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email || 'example@abc.com'}
                  </p>
                  <span className="inline-block px-2 py-1 mt-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                    {user?.role || 'Docente'}
                  </span>
                </div>
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 rounded-b-lg"
                >
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
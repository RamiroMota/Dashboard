import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Moon, Sun, Menu, User, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const [showProfile, setShowProfile] = useState(false);

  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    return paths.map((path) => path.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')).join(' / ');
  };

  const handleLogout = () => {
    // Add logout logic here
  };

  return (
    <nav className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-1">
            <button type='button'
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 text-gray-600 dark:text-gray-300">
              {getBreadcrumbs() || 'Inicio'}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button type='button' className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
            <button type='button'
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {darkMode ? (
                <Sun className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="h-6 w-6 text-gray-600" />
              )}
            </button>
            <div className="relative">
              <button type='button'
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </div>
              </button>
              
              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Fernando Arreola
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      example@abc.com
                    </p>
                    <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                      Docente
                    </span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 mt-2">
                    <button type='button'
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

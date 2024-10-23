import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, GraduationCap, FlaskConical, Settings, ChevronDown, LifeBuoy } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const menuItems = [
    {
      name: 'Inicio',
      icon: Home,
      path: '/'
    },
    {
      name: 'Dirección académica',
      icon: GraduationCap,
      submenu: [
        { name: 'Secuencia didáctica', path: '/direccion-academica/secuencia-didactica' }
      ]
    },
    {
      name: 'Dirección de investigación',
      icon: FlaskConical,
      submenu: [
        { name: 'Investigaciones', path: '/direccion-investigacion/investigaciones' }
      ]
    },
    {
      name: 'Configuración',
      icon: Settings,
      submenu: [
        { name: 'Colores', path: '/configuracion/colores' }
      ]
    }
  ];

  const baseClasses = `fixed inset-y-0 left-0 z-50 w-64 h-full transform transition-transform duration-300 ease-in-out 
    bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 lg:static lg:translate-x-0
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside className={baseClasses}>
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
          </div>
          <nav className="flex-1 overflow-y-auto px-2">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <div>
                    <button type='button'
                      onClick={() => toggleMenu(item.name)}
                      className="w-full flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`ml-auto h-4 w-4 transform transition-transform ${
                          expandedMenus[item.name] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedMenus[item.name] && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <NavLink
                            key={subItem.path}
                            to={subItem.path}
                            className={({ isActive }) =>
                              `block px-4 py-2 text-sm rounded-lg ${
                                isActive
                                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                              }`
                            }
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded-lg ${
                        isActive
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                  </NavLink>
                )}
              </div>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {/* Add support ticket logic */}}
              className="w-full flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <LifeBuoy className="h-5 w-5 mr-3" />
              <span>Soporte</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Search, 
  Settings, 
  HelpCircle, 
  ChevronRight, 
  ChevronDown 
} from 'lucide-react';

const Sidebar = () => {
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (menuTitle: string) => {
    setExpandedMenus((prevState) => ({
      ...prevState,
      [menuTitle]: !prevState[menuTitle],
    }));
  };

  const menus = [
    {
      title: 'Inicio',
      icon: <Home size={20} />,
      path: '/', // Ruta de la página de inicio
    },
    {
      title: 'Dirección Académica',
      icon: <BookOpen size={20} />,
      path: '/dir-academica',
      submenu: [
        { title: 'Secuencia didáctica', path: '/dir-academica/secuencia' }
      ]
    },
    {
      title: 'Dirección de Investigación',
      icon: <Search size={20} />,
      path: '/dir-investigacion',
      submenu: [
        { title: 'Investigaciones', path: '/dir-investigacion/investigaciones' }
      ]
    },
    {
      title: 'Configuración',
      icon: <Settings size={20} />,
      path: '/configpub',
      submenu: [
        { title: 'Colores', path: '/configpub/colores' }
      ]
    }
  ];

  return (
    <div className="h-screen bg-white dark:bg-gray-800 w-80 sm:w-64 flex flex-col shadow-lg border-r border-gray-200 dark:border-gray-600">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Sistema Académico</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-4">
          {menus.map((menu, index) => (
            <li key={index}>
              {/* Se usa NavLink para el menú "Inicio" */}
              {menu.title === 'Inicio' ? (
                <NavLink
                  to={menu.path}
                  className={({ isActive }) =>
                    `flex items-center p-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      isActive ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`
                  }
                >
                  {menu.icon}
                  <span className="ml-3 truncate flex-1 overflow-hidden whitespace-nowrap">{menu.title}</span>
                </NavLink>
              ) : (
                <div
                  className="flex items-center p-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => toggleMenu(menu.title)}
                >
                  {menu.icon}
                  <span className="ml-3 truncate flex-1 overflow-hidden whitespace-nowrap">{menu.title}</span>
                  {menu.submenu && (
                    expandedMenus[menu.title] ? 
                    <ChevronDown className="ml-auto" size={16} /> :
                    <ChevronRight className="ml-auto" size={16} />
                  )}
                </div>
              )}

              {menu.submenu && expandedMenus[menu.title] && (
                <ul className="ml-6 mt-2 space-y-2">
                  {menu.submenu.map((submenu, subIndex) => (
                    <li key={subIndex}>
                      <NavLink
                        to={submenu.path}
                        className={({ isActive }) =>
                          `flex items-center p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            isActive ? 'bg-gray-100 dark:bg-gray-700' : ''
                          }`
                        }
                      >
                        <span className="ml-3 truncate flex-1 overflow-hidden whitespace-nowrap">{submenu.title}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full flex items-center p-2 text-sm text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <HelpCircle size={16} />
          <span className="ml-2 truncate flex-1 overflow-hidden whitespace-nowrap">Soporte</span>
        </button>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
          versión 1.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
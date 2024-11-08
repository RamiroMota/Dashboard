// UserGestion.tsx
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Modulos } from '../modulos/modulos';
import { User, BookOpenCheckIcon, Captions, FileText } from 'lucide-react';

const icons = {
  userlist: <User className="h-4 w-4" />,
  acciones: <BookOpenCheckIcon className="h-4 w-4" />,
  rolespermisos: <Captions className="h-4 w-4" />,
  // Agrega más íconos para otros módulos si es necesario
};

const UserGestion: React.FC = () => {
  const location = useLocation(); // Obtener la ruta actual

  return (
    <div className="flex flex-col items-center w-full">
      {/* Navegación con tabs */}
      <nav className="w-full max-w-3xl">
        <ul className="flex border-b">
          {Modulos.map((modulo) => (
            <li className="flex-1" key={modulo.id}>
              <Link to={modulo.route} aria-current="page">
                <button
                  type="button"
                  className={`flex items-center justify-center gap-2 p-3 text-sm font-medium ${
                    location.pathname === modulo.route
                      ? 'border-b-2 border-gray-900 text-primary' // Solo el tab activo tiene borde inferior
                      : 'border-b-2 border-transparent text-muted-foreground hover:border-muted hover:text-foreground'
                  }`}
                >
                  {icons[modulo.id as keyof typeof icons] || <FileText className="h-4 w-4" />}
                  {modulo.name}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Contenido del módulo seleccionado */}
      <div className="mt-4 w-3/4">
        <Outlet /> {/* Renderiza el contenido del módulo en base a la ruta */}
      </div>
    </div>
  );
};

export default UserGestion;
import React, { useEffect, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import axios from 'axios';
import moment from 'moment-timezone';

// Función para eliminar los acentos (tildes) y hacer la comparación más flexible
const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

interface User {
  _id: string;
  Nombre: string;
  Apellidos: string;
  Correo: string;
  Password: string;
  Funcion: string;
  CreadoEl: string;
  ActualizadoEl: string;
  roleName: string;
}

// Función para formatear fechas a dd-mm-aaaa en la zona horaria de Ciudad de México
const formatDate = (date: string) => {
  return moment(date)
    .tz('America/Mexico_City', true) // Convertir a la zona horaria de Ciudad de México
    .format('DD-MM-YYYY'); // Formato dd-mm-aaaa
};

const UserList: React.FC = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Para almacenar el usuario seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Almacena el término de búsqueda

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Número de usuarios por página

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/usuarios');
        setUsuarios(response.data.usuarios);
      } catch (error) {
        console.error('Error al obtener los usuarios', error);
      }
    };

    fetchUsuarios();
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleRowClick = (usuario: User) => {
    setSelectedUser(usuario); // Establecer el usuario seleccionado
    setIsModalOpen(true); // Abrir el modal
  };

  // Función para manejar el cambio en el input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Actualizar el término de búsqueda
  };

  // Función para determinar si un usuario debe ser resaltado según el término de búsqueda
  const highlightSearchMatch = (usuario: User): boolean => {
    const fullName = `${removeAccents(usuario.Nombre)} ${removeAccents(usuario.Apellidos)}`.toLowerCase();
    const reverseName = `${removeAccents(usuario.Apellidos)} ${removeAccents(usuario.Nombre)}`.toLowerCase();
    const search = removeAccents(searchTerm.toLowerCase());

    // Si el término de búsqueda está vacío, no resaltar nada
    if (!searchTerm) return false;

    // Resaltar si el término de búsqueda coincide con alguna de las combinaciones de nombre y apellidos
    return (
      fullName.includes(search) ||  // Coincidencia en el nombre completo (Nombre + Apellidos)
      reverseName.includes(search) || // Coincidencia en la reversa (Apellidos + Nombre)
      removeAccents(usuario.Nombre.toLowerCase()).includes(search) || // Coincidencia solo con el nombre
      removeAccents(usuario.Apellidos.toLowerCase()).includes(search) || // Coincidencia solo con los apellidos
      removeAccents(usuario.Correo.toLowerCase()).includes(search) // Coincidencia en el correo
    );
  };

  // Obtener los usuarios para la página actual
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usuarios.slice(indexOfFirstUser, indexOfLastUser);

  // Cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Total de páginas
  const totalPages = Math.ceil(usuarios.length / usersPerPage);

  return (
    <div className="relative">
      {/* Sección de búsqueda */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Buscar por nombre o correo"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded-md w-1/4"
        />
      </div>

      {/* Tabla elegante con bordes redondeados */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">#</th>
            <th className="py-2 px-4 border-b text-left">Nombre del usuario</th>
            <th className="py-2 px-4 border-b text-left">Correo</th>
            <th className="py-2 px-4 border-b text-left">Rol</th>
            <th className="py-2 px-4 border-b text-left">Función</th>
            <th className="py-2 px-4 border-b text-left">Creado el</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((usuario, index) => {
            const isHighlighted = highlightSearchMatch(usuario); // Resaltar si hay coincidencia

            return (
              <tr
                key={usuario._id}
                onDoubleClick={() => handleRowClick(usuario)} // Al hacer doble clic se abre el modal
                className={`cursor-pointer ${isHighlighted ? 'bg-black text-white' : ''} ${isHighlighted ? 'hover:bg-transparent' : 'hover:bg-gray-50'}`} // Deshabilitar hover en filas resaltadas
              >
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b" style={{ whiteSpace: 'nowrap' }}>
                  {usuario.Nombre} {usuario.Apellidos}
                </td>
                <td className="py-2 px-4 border-b" style={{ whiteSpace: 'nowrap' }}>
                  {usuario.Correo}
                </td>
                <td className="py-2 px-4 border-b">{usuario.roleName}</td>
                <td className="py-2 px-4 border-b">{usuario.Funcion}</td>
                {/* Formatear las fechas con la zona horaria de Ciudad de México */}
                <td className="py-2 px-4 border-b text-[10px]">{formatDate(usuario.CreadoEl)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-center items-center mt-4">
        <button type="button"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Atrás
        </button>

        {/* Botones de número de página */}
        {[...Array(totalPages)].map((_, index) => (
          <button type="button"
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 mx-1 text-sm ${currentPage === index + 1 ? 'bg-gray-900 text-white' : 'bg-gray-300 text-black'} rounded-md hover:bg-orange-500`}
          >
            {index + 1}
          </button>
        ))}

        <button type="button"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastUser >= usuarios.length}
          className="px-3 py-1 mx-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Adelante
        </button>
      </div>

      {/* Modal con fondo que bloquea la interacción con el resto de la página */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
            <h2 className="text-2xl font-bold mb-4">Detalles del Usuario</h2>
            <div className="space-y-3">
              <p><strong>Nombre:</strong> {selectedUser.Nombre}</p>
              <p><strong>Apellidos:</strong> {selectedUser.Apellidos}</p>
              <p><strong>Rol:</strong> {selectedUser.roleName}</p>
              <p><strong>Función:</strong> {selectedUser.Funcion}</p>
              <p><strong>Creado el:</strong> {formatDate(selectedUser.CreadoEl)}</p>
              <p><strong>Actualizado el:</strong> {formatDate(selectedUser.ActualizadoEl)}</p>
              <p><strong>Correo:</strong> {selectedUser.Correo}</p>
              
              <div className="flex items-center">
                <strong className="mr-2">Contraseña:</strong>
                <input
                  type={showPassword ? "text" : "password"}
                  value={selectedUser.Password || "*****"} // Usar '*****' si no es necesario mostrar la contraseña real
                  readOnly
                  className="border rounded px-2 py-1"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="ml-2 focus:outline-none"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={toggleModal}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
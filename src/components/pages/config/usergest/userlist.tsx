import { useState, useEffect, useMemo } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  function: string;
  createdAt: string;
  updatedAt: string;
  password: string;
}

export default function Component() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('fecha');
  const [filterValue, setFilterValue] = useState<string>('');
  const [sortType, setSortType] = useState<string>('ascendente');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/');
        console.log('Respuesta de la API:', response.data);
        const usuarios = response.data.usuarios;
        if (Array.isArray(usuarios)) {
          setUsers(usuarios);
        } else {
          console.error('La respuesta de la API no es un array.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredAndSortedUsers = useMemo(() => {
    let filteredUsers = [...users];

    if (searchTerm) {
      filteredUsers = filteredUsers.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterValue) {
      if (filterType === 'fecha') {
        filteredUsers = filteredUsers.filter(user =>
          user.createdAt.includes(filterValue)
        );
      } else if (filterType === 'rol') {
        filteredUsers = filteredUsers.filter(user =>
          user.role.toLowerCase().includes(filterValue.toLowerCase())
        );
      } else if (filterType === 'funcion') {
        filteredUsers = filteredUsers.filter(user =>
          user.function.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
    }

    if (sortType === 'ascendente') {
      filteredUsers = filteredUsers.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    } else {
      filteredUsers = filteredUsers.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }

    return filteredUsers;
  }, [users, searchTerm, filterType, filterValue, sortType]);

  const pageCount = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const paginatedUsers = filteredAndSortedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setShowPassword(false);
    setDialogOpen(true);
  };

  const renderPaginationButtons = () => {
    return Array.from({ length: pageCount }, (_, index) => (
      <button type="button" 
      key={`pagination-button-${pageCount}-${index}`} onClick={() => setCurrentPage(index + 1)} className={`p-2 border rounded ${currentPage === index + 1 ? 'bg-gray-300' : ''}`}>
        {index + 1}
      </button>
    ));
  };

  return (
    <div className="w-full space-y-4">
      {/* Barra de búsqueda y filtros */}
      <div className="flex items-center gap-2 flex-wrap">
        <input
          className="w-64 border p-2 rounded"
          placeholder="Buscar por nombre o correo"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="text-sm font-medium">Filtro por:</span>
        <select
          className="w-[120px] border p-2 rounded"
          value={filterType}
          onChange={(e) => { setFilterType(e.target.value); setSortType(e.target.value === 'fecha' ? 'antes' : 'ascendente'); }}
        >
          <option value="fecha">Fecha</option>
          <option value="rol">Rol</option>
          <option value="funcion">Función</option>
        </select>
        <select
          className="w-[120px] border p-2 rounded"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          {filterType === 'fecha' ? (
            <>
              <option value="antes">Antes de:</option>
              <option value="despues">Después de:</option>
            </>
          ) : (
            <>
              <option value="ascendente">Ascendente</option>
              <option value="descendente">Descendente</option>
            </>
          )}
        </select>
        <input
          className="w-48 border p-2 rounded"
          placeholder={filterType === 'fecha' ? 'dd-mm-aaaa' : `Filtrar por ${filterType}`}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>

      {/* Tabla de usuarios */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre de usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Función</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creado el</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 cursor-pointer"
                onDoubleClick={() => handleRowClick(user)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.function}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botones de paginación */}
      <div className="flex justify-center items-center gap-2">
        <button type="button" onClick={() => setCurrentPage(1)} className="p-2 border rounded">
          {'<<'}
        </button>
        {renderPaginationButtons()}
        <button type="button" onClick={() => setCurrentPage(pageCount)} className="p-2 border rounded">
          {'>>'}
        </button>
      </div>

      {/* Dialogo de detalles del usuario seleccionado */}
      {dialogOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold">Detalles del Usuario</h3>
            <p className="mt-2">Nombre: {selectedUser.firstName} {selectedUser.lastName}</p>
            <p className="mt-1">Correo: {selectedUser.email}</p>
            <p className="mt-1">Rol: {selectedUser.role}</p>
            <p className="mt-1">Función: {selectedUser.function}</p>
            <p className="mt-1">Creado el: {selectedUser.createdAt}</p>
            <button type='button' onClick={() => setDialogOpen(false)} className="mt-4 text-red-500">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
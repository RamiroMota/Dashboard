import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from './userTable';
import UserModal from './userModal';
import Pagination from './userPagination';
import UserBotones from './userBotones';
import { User } from '../../../types/userTypes';
import UserAddModal from './userAddModal';
import { agregarUsuario } from '../../../db/actions';

const UserList: React.FC = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Nuevo estado para abrir/cerrar el modal de agregar
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsuarios, setFilteredUsuarios] = useState<User[]>([]); // Para los usuarios filtrados

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await axios.get('http://localhost:5000/api/usuarios');
      setUsuarios(response.data.usuarios);
      setFilteredUsuarios(response.data.usuarios); // Al principio, no hay filtro
    };
    fetchUsuarios();
  }, []);

  // Función para manejar la búsqueda de usuarios
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearchTerm(searchQuery);

    if (searchQuery.trim() !== '') {
      const filtered = usuarios.filter(usuario =>
        highlightSearchMatch(usuario, searchQuery)
      );
      setFilteredUsuarios(filtered);
      const firstMatchingUserIndex = filtered.findIndex(usuario =>
        highlightSearchMatch(usuario, searchQuery)
      );
      if (firstMatchingUserIndex >= 0) {
        const newPage = Math.ceil((firstMatchingUserIndex + 1) / 6); // Usa 6 usuarios por página
        setCurrentPage(newPage);
      }
    } else {
      setFilteredUsuarios(usuarios); // Si no hay búsqueda, mostrar todos los usuarios
      setCurrentPage(1); // Restablece a la primera página si no hay búsqueda
    }
  };

  // Toggle para el modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Función que maneja el clic en una fila
  const handleRowClick = (usuario: User) => {
    setSelectedUser(usuario);
    setIsModalOpen(true);
  };

  // Función para la paginación
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Función para resaltar los términos que coinciden en la búsqueda
  const highlightSearchMatch = (usuario: User, searchTerm: string): boolean => {
    return (
      usuario.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.Correo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Función para abrir el modal de agregar usuario
  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  // Función para agregar un nuevo usuario usando la API
  const handleAddUser = async (newUser: User) => {
    try {
      const response = await axios.post('http://localhost:5000/api/usuarios/crear', newUser);
      const addedUser = response.data.user;
      setUsuarios([...usuarios, addedUser]);
      setFilteredUsuarios([...filteredUsuarios, addedUser]);
      setIsAddModalOpen(false); // Cierra el modal después de agregar
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  // Lógica para la paginación de usuarios filtrados
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsuarios = filteredUsuarios.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o correo"
          value={searchTerm}
          onChange={handleSearch}
          className="w-1/3 border rounded-md p-2"
        />
        <UserBotones onAddClick={handleAddClick} />
      </div>
      <div className="mb-4">
        <UserTable
          usuarios={currentUsuarios} // Ahora se pasa la lista filtrada de usuarios
          handleRowClick={handleRowClick}
          searchTerm={searchTerm}
          highlightSearchMatch={highlightSearchMatch}
          currentPage={currentPage}
        />
      </div>
      {isModalOpen && selectedUser && (
        <UserModal
          selectedUser={selectedUser}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          toggleModal={toggleModal}
        />
      )}
      {/* Modal de agregar usuario */}
      {isAddModalOpen && (
        <UserAddModal
          isOpen={isAddModalOpen}
          toggleModal={() => setIsAddModalOpen(false)}
          onAddUser={handleAddUser} // Usa la función handleAddUser
        />
      )}
      {/* Los controles de paginación se colocan justo debajo de la tabla */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsuarios.length / itemsPerPage)} // Calcula las páginas según los usuarios filtrados
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default UserList;
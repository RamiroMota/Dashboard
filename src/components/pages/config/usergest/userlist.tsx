import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from './userTable';
import UserModal from './userModal';
import Pagination from './userPagination';
import UserBotones from './userBotones';
import { User } from '../../../types/userTypes';
import UserAddModal from './userAddModal';

const UserList: React.FC = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Nuevo estado para abrir/cerrar el modal de agregar
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await axios.get('http://localhost:5000/api/usuarios');
      setUsuarios(response.data.usuarios);
    };
    fetchUsuarios();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearchTerm(searchQuery);

    if (searchQuery.trim() !== '') {
      const firstMatchingUserIndex = usuarios.findIndex(usuario =>
        highlightSearchMatch(usuario, searchQuery)
      );

      if (firstMatchingUserIndex >= 0) {
        const newPage = Math.ceil((firstMatchingUserIndex + 1) / 6); // Usa 6 usuarios por página
        setCurrentPage(newPage);
      }
    } else {
      setCurrentPage(1); // Restablece a la primera página si no hay búsqueda
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleRowClick = (usuario: User) => {
    setSelectedUser(usuario);
    setIsModalOpen(true);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const highlightSearchMatch = (usuario: User, searchTerm: string): boolean => {
    return (
      usuario.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.Correo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Funciones para los clics de Agregar y Editar
  const handleAddClick = () => {
    setIsAddModalOpen(true); // Abre el modal de agregar
  };

  const handleEditClick = () => {
    // Lógica para el botón de editar
    console.log("Editar usuario");
  };

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
        <UserBotones onAddClick={handleAddClick} onEditClick={handleEditClick} onDelClick={handleAddClick} onPermisosClick={handleAddClick}  />
      </div>
      <div className="mb-4">
        <UserTable
          usuarios={usuarios}
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
          onAddUser={(newUser) => console.log("Nuevo usuario agregado:", newUser)}
        />
      )}
      {/* Los controles de paginación se colocan justo debajo de la tabla */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(usuarios.length / 7)}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default UserList;
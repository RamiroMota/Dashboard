import React, { useState } from 'react';
import { User } from '../../../types/userTypes';
import { removeAccents, formatDate } from '../../../utils/userGeneral';

interface UserTableProps {
  usuarios: User[];
  handleRowClick: (usuario: User) => void;
  searchTerm: string;
  highlightSearchMatch: (usuario: User, searchTerm: string) => boolean;
  currentPage: number;
}

const UserTable: React.FC<UserTableProps> = ({
  usuarios,
  handleRowClick,
  searchTerm,
  highlightSearchMatch,
  currentPage,
}) => {
  const usersPerPage = 7;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usuarios.slice(indexOfFirstUser, indexOfLastUser);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Función para manejar el clic en el checkbox
  const handleCheckboxChange = (userId: string) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  // Función para manejar el cambio de estado cuando se encuentre una coincidencia
  const handleSearchHighlight = (usuario: User): boolean => {
    if (searchTerm && highlightSearchMatch(usuario, searchTerm)) {
      return true;
    }
    return false;
  };

  return (
    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4 border-b text-left">
            <input type="checkbox" className="form-checkbox text-orange-500" />
          </th>
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
          const isSelected = selectedRows.includes(usuario._id);
          const isHighlighted = handleSearchHighlight(usuario);

          return (
            <tr
              key={usuario._id}
              onDoubleClick={() => handleRowClick(usuario)}
              className={`cursor-pointer ${isSelected || isHighlighted ? 'bg-gray-500 text-white' : 'bg-white'}`}
            >
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  className="form-checkbox text-orange-500"
                  checked={isSelected || isHighlighted}  // Marcamos el checkbox si está resaltado o seleccionado
                  onChange={() => handleCheckboxChange(usuario._id)}
                />
              </td>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">
                {usuario.Nombre} {usuario.Apellidos}
              </td>
              <td className="py-2 px-4 border-b">{usuario.Correo}</td>
              <td className="py-2 px-4 border-b">{usuario.roleName}</td>
              <td className="py-2 px-4 border-b">{usuario.Funcion}</td>
              <td className="py-2 px-4 border-b text-[10px]">
                {formatDate(usuario.CreadoEl)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
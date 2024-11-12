import React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { User } from '../../../types/userTypes';
import { formatDate } from '../../../utils/userGeneral';

interface UserModalProps {
  selectedUser: User;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  toggleModal: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ selectedUser, showPassword, togglePasswordVisibility, toggleModal }) => (
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
            value="*****"
            readOnly
            className="border rounded px-2 py-1"
          />
          <button type='button' onClick={togglePasswordVisibility} className="ml-2 focus:outline-none">
            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <button type='button' onClick={toggleModal} className="bg-gray-800 text-white px-4 py-2 rounded mt-4 hover:bg-orange-500">
        Cerrar
      </button>
    </div>
  </div>
);

export default UserModal;

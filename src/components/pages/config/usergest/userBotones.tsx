// src/components/userBotones.tsx
import { FilePenLine } from 'lucide-react';
import React from 'react';
import { FiPlus, FiEdit2 } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';

interface UserBotonesProps {
  onAddClick: () => void;
  onEditClick: () => void;
  onDelClick: () => void;
  onPermisosClick: () => void;
}

const UserBotones: React.FC<UserBotonesProps> = ({ onAddClick, onEditClick, onDelClick, onPermisosClick }) => {
  return (
    <div className="flex space-x-2 text-sm">
      <button type='button'
        onClick={onAddClick}
        className="flex items-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-green-500 transition"
      >
        <FiPlus className="mr-2" /> Agregar
      </button>
      <button type='button'
        onClick={onEditClick}
        className="flex items-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-orange-500 transition"
      >
        <FiEdit2 className="mr-2" /> Editar
        
      </button>
      <button type='button'
        onClick={onDelClick}
        className="flex items-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-red-500 transition"
      >
        <RiDeleteBinLine className="mr-2" /> Eliminar
        
      </button>
      <button type='button'
        onClick={onPermisosClick}
        className="flex items-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-purple-500 transition"
      >
        <FilePenLine className="mr-2" /> Permisos
        
      </button>
    </div>
  );
};

export default UserBotones;

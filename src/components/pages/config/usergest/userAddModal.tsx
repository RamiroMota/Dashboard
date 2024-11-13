import React, { useState, useEffect, useRef } from 'react';

interface UserAddModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  onAddUser: (newUser: User) => void;
}

interface User {
  Nombre: string;
  Apellidos: string;
  Correo: string;
  Contraseña: string;
  Rol: string;
  Funcion: string;
}

const UserAddModal: React.FC<UserAddModalProps> = ({ isOpen, toggleModal, onAddUser }) => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState('');
  const [funcion, setFuncion] = useState('');
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const nombreRef = useRef<HTMLInputElement>(null); // Crear referencia para el campo "Nombre"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      Nombre: nombre,
      Apellidos: apellidos,
      Correo: correo,
      Contraseña: contraseña,
      Rol: rol,
      Funcion: funcion,
    };
    onAddUser(newUser);
    toggleModal();
  };

  const closeModal = () => {
    if (nombre || apellidos || correo || contraseña || rol || funcion) {
      setShowConfirmClose(true); // Mostrar confirmación si hay datos
    } else {
      toggleModal(); // Cerrar directamente si está vacío
    }
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, nombre, apellidos, correo, contraseña, rol, funcion]);

  useEffect(() => {
    if (isOpen && nombreRef.current) {
      nombreRef.current.focus(); // Enfocar automáticamente en el campo "Nombre" al abrir el modal
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 ${isOpen ? '' : 'hidden'}`}
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md z-60">
        <h2 className="text-2xl mb-4">Agregar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              ref={nombreRef} // Asignar la referencia al campo "Nombre"
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="apellidos">Apellidos</label>
            <input
              id="apellidos"
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="correo">Correo</label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="contraseña">Contraseña</label>
            <input
              id="contraseña"
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="rol">Rol</label>
            <select
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Seleccionar Rol</option>
              <option value="Admin">Administrador</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Observador</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="funcion">Función</label>
            <select
              id="funcion"
              value={funcion}
              onChange={(e) => setFuncion(e.target.value)}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Seleccionar Función</option>
              <option value="Docente">Docente</option>
              <option value="Gestor">Gestor</option>
              <option value="Administrador">Administrador</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Coordinador">Coordinador</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
            >
              Agregar Usuario
            </button>
          </div>
        </form>

        {showConfirmClose && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60">
            <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-sm">
              <p className="mb-4">¿Estás seguro que deseas cerrar el formulario?</p>
              <div className="flex justify-center">
                <button
                  className="px-6 py-2 mx-6 bg-red-500 text-white rounded hover:bg-red-700 transition"
                  onClick={() => {
                    setShowConfirmClose(false);
                    toggleModal();
                  }}
                >
                  Sí
                </button>
                <button
                  className="px-6 py-2 mx-6 bg-gray-400 text-white rounded hover:bg-gray-700 transition"
                  onClick={() => setShowConfirmClose(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAddModal;
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import notFoundImage from '../../assets/not-found.png'; // Asegúrate de tener esta imagen

const Error404: React.FC = () => {
  const { darkMode } = useStore();

  return (
    <div className={`flex flex-col items-center justify-center h-screen text-center bg-${darkMode ? 'gray-900' : 'white'} text-${darkMode ? 'gray-200' : 'gray-800'}`}>
      <img src={notFoundImage} alt="Not Found" className="w-1/2 md:w-1/3 mb-8" />
      <h1 className="text-5xl font-bold mb-4">¡Oops! Página no encontrada.</h1>
      <p className="text-xl mb-6">La página que buscas no existe o ha sido movida.</p>
      <Link to="/" className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
        Volver al inicio
      </Link>
    </div>
  );
};

export default Error404;
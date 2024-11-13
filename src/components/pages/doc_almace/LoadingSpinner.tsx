import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      <p className="mt-4 text-gray-500">Cargando archivos...</p>
    </div>
  );
};
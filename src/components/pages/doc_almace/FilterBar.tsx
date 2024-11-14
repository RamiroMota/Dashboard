import React from 'react';
import { useFileStore } from '../../store/useFileStore';

export const FilterBar: React.FC = () => {
  const { filterType, setFilterType } = useFileStore();

  return (
    <select
      value={filterType || ''}
      onChange={(e) => setFilterType(e.target.value || null)}
      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 dark:bg-gray-800 focus:ring-orange-500 cursor-pointer dark:text-white "
    >
      <option value="">Todos los archivos</option>
      <option value="image">Imagen</option>
      <option value="application/pdf">PDF</option>
      <option value="application/msword">DOC/DOCX</option>
    </select>
  );
};
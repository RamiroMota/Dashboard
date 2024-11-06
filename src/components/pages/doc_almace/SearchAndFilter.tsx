import React from 'react';
import { Search, Filter } from 'lucide-react';
import { FileType } from '../../types/file';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedType: FileType | 'all';
  onTypeChange: (type: FileType | 'all') => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar archivos por nombre..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 dark:bg-gray-600 dark:text-white bg-white focus:ring-orange-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex items-center gap-2 min-w-[200px]">
        <Filter className="text-gray-400 w-5 h-5" />
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value as FileType | 'all')}
          className="flex-1 py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-600 dark:text-white bg-white"
        >
          <option value="all">Todos los archivos</option>
          <option value="image">Imágenes</option>
          <option value="document">Documentos</option>
        </select>
      </div>
    </div>
  );
};
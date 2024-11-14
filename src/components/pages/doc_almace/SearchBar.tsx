import React from 'react';
import { Search } from 'lucide-react';
import { useFileStore } from '../../store/useFileStore';

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useFileStore();

  return (
    <div className="relative">
      <Search className="absolute animate-pulse left-3 top-1/2 transform -translate-y-1/2 text-gray-800 dark:text-white w-5 h-5" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Búsqueda por nombre..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 te focus:ring-blue-500"
      />
    </div>
  );
};
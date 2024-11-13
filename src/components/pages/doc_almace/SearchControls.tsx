// SearchControls.tsx
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, selectedType, onTypeChange }) => {
  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search files..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      />
      <select
        value={selectedType || ''}
        onChange={(e) => onTypeChange(e.target.value || null)}
        className="ml-4 border border-gray-300 rounded-lg"
      >
        <option value="">Todos</option>
        <option value="image">Imagen</option>
        <option value="document">Documento</option>
      </select>
    </div>
  );
};
import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

interface ViewToggleProps {
  isGridView: boolean;
  onToggle: () => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ isGridView, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:bg-gray-600 dark:text-white bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {isGridView ? (
        <>
          <List className="w-4 h-4" />
          Vista Lista
        </>
      ) : (
        <>
          <LayoutGrid className="w-4 h-4" />
          Vista Cuadrícula
        </>
      )}
    </button>
  );
};
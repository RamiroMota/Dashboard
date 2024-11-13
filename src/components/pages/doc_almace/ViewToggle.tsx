import React from 'react';
import { Grid, List } from 'lucide-react';
import { ViewMode } from '../../types/file';

interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded ${
          view === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'
        }`}
      >
        <Grid size={20} />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded ${
          view === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'
        }`}
      >
        <List size={20} />
      </button>
    </div>
  );
};
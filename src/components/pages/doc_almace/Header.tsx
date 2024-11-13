import React from 'react';
import { ViewToggle } from './ViewToggle';
import { ViewMode } from '../../types/file';

interface HeaderProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">My Drive</h1>
      <ViewToggle view={view} onViewChange={onViewChange} />
    </div>
  );
};
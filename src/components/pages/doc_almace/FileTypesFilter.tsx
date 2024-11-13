import React from 'react';
import { FileCard } from './FileCard';
import { FileItem, ViewMode } from '../../types/file';

interface FileGridProps {
  files: FileItem[];
  view: ViewMode;
  selectedFiles: Set<string>;
  onSelect: (id: string) => void;
  onDownload: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export const FileGrid: React.FC<FileGridProps> = ({
  files,
  view,
  selectedFiles,
  onSelect,
  onDownload,
  onDelete,
}) => {
  return (
    <div
      className={`grid gap-4 ${
        view === 'grid'
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          : 'grid-cols-1'
      }`}
    >
      {files.map(file => (
        <FileCard
          key={file.id}
          file={file}
          view={view}
          isSelected={selectedFiles.has(file.id)}
          onSelect={onSelect}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
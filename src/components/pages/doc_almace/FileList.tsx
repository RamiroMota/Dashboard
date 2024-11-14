import React from 'react';
import { Grid, List, Download, Trash2, FileIcon } from 'lucide-react';
import { useFileStore } from '../../store/useFileStore';
import { FileCard } from './FileCard';
import { FileRow } from './FileRow';

export const FileList: React.FC = () => {
  const {
    files,
    viewMode,
    searchQuery,
    filterType,
    setViewMode,
    selectedFiles,
  } = useFileStore();

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !filterType || file.type.includes(filterType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'hover:bg-gray-300'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'hover:bg-gray-300'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
        
        {selectedFiles.size > 0 && (
          <div className="flex gap-2">
            <span className="text-sm text-gray-600">
              {selectedFiles.size} selecciona
            </span>
          </div>
        )}
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredFiles.map((file) => (
            <FileRow key={file.id} file={file} />
          ))}
        </div>
      )}
    </div>
  );
};
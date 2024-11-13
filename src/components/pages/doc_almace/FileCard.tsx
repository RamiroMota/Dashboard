import React from 'react';
import { Download, Trash2, FileIcon } from 'lucide-react';
import { FileItem } from '../../types/file';
import { formatFileSize } from '../../utils/FileUtils';

interface FileCardProps {
  file: FileItem;
  view: 'grid' | 'list';
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDownload: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export const FileCard: React.FC<FileCardProps> = ({
  file,
  view,
  isSelected,
  onSelect,
  onDownload,
  onDelete,
}) => {
  const isImage = file.type.startsWith('image/');
  const preview = isImage ? file.url : null;

  const CardContent = () => (
    <>
      <div className="relative group">
        <div className={`aspect-square rounded-lg overflow-hidden bg-gray-100 
          ${view === 'list' ? 'w-12 h-12' : 'w-full'}`}>
          {preview ? (
            <img
              src={preview}
              alt={file.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <FileIcon size={24} />
            </div>
          )}
        </div>
        <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 
          transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload(file.id, file.name);
            }}
            className="p-2 bg-white rounded-full mx-1 hover:bg-gray-100"
          >
            <Download size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(file.id);
            }}
            className="p-2 bg-white rounded-full mx-1 hover:bg-gray-100"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        </div>
      </div>
      <div className={view === 'list' ? 'ml-4 flex-grow' : 'mt-2'}>
        <p className="font-medium truncate">{file.name}</p>
        <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
      </div>
    </>
  );

  return view === 'grid' ? (
    <div
      onClick={() => onSelect(file.id)}
      className={`p-4 rounded-lg cursor-pointer transition-all
        ${isSelected ? 'bg-blue-50 ring-2 ring-blue-500' : 'hover:bg-gray-50'}`}
    >
      <CardContent />
    </div>
  ) : (
    <div
      onClick={() => onSelect(file.id)}
      className={`p-4 flex items-center rounded-lg cursor-pointer transition-all
        ${isSelected ? 'bg-blue-50 ring-2 ring-blue-500' : 'hover:bg-gray-50'}`}
    >
      <CardContent />
    </div>
  );
};
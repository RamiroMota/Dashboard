import React from 'react';
import { Download, Trash2, FileIcon } from 'lucide-react';
import { FileItem } from '../../types/file';
import { useFileStore } from '../../store/useFileStore';

interface FileCardProps {
  file: FileItem;
}

export const FileCard: React.FC<FileCardProps> = ({ file }) => {
  const { removeFile, toggleFileSelection, selectedFiles } = useFileStore();
  const isSelected = selectedFiles.has(file.id);

  const handleDownload = () => {
    const url = URL.createObjectURL(file.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`relative p-4 border hover:shadow-lg rounded-lg cursor-pointer transition-all dark:text-gray-300
        ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:shadow-lg hover:border-blue-300'}`}
      onClick={() => toggleFileSelection(file.id)}
    >
      <div className="aspect-square mb-2">
        {file.type.startsWith('image/') ? (
          <img
            src={file.preview}
            alt={file.name}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded">
            <FileIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <p className="font-medium truncate" title={file.name}>
          {file.name}
        </p>
        <p className="text-sm text-gray-500">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            className="p-2 text-blue-600 hover:bg-blue-500 hover:text-white rounded-full"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFile(file.id);
            }}
            className="p-2 hover:bg-red-500 hover:text-white rounded-full text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
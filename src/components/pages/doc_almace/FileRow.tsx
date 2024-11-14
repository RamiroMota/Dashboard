import React from 'react';
import { Download, Trash2, FileIcon } from 'lucide-react';
import { FileItem } from '../../types/file';
import { useFileStore } from '../../store/useFileStore';

interface FileRowProps {
  file: FileItem;
}

export const FileRow: React.FC<FileRowProps> = ({ file }) => {
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
      className={`flex items-center p-4 border rounded cursor-pointer transition-all
        ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
      onClick={() => toggleFileSelection(file.id)}
    >
      <div className="w-10 h-10 mr-4">
        {file.type.startsWith('image/') ? (
          <img
            src={file.preview}
            alt={file.name}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
            <FileIcon className="w-6 h-6 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate" title={file.name}>
          {file.name}
        </p>
        <p className="text-sm text-gray-500">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>

      <div className="flex gap-2 ml-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
          className="p-2 hover:bg-blue-500 rounded-full hover:text-white text-blue-500"
        >
          <Download className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeFile(file.id);
          }}
          className="p-2 hover:bg-red-500 rounded-full text-red-500 hover:text-white"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
import React from 'react';

interface UploadProgressProps {
  progress: number;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({ progress }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-blue-700">Subiendo...</span>
        <span className="text-sm font-medium text-blue-700">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-orange-600 focus:ring-gray-800 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
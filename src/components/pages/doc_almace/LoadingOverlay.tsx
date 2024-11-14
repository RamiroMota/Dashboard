import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  message: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-orange-600 border-gray-100 animate-spin" />
        <p className="text-gray-700 dark:text-gray-300 font-medium">{message}</p>
      </div>
    </div>
  );
};
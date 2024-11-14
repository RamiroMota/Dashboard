import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useFileStore } from '../../store/useFileStore';

const ACCEPTED_FILE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
};

const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_FILES = 5;

export const FileUploader: React.FC = () => {
  const { addFiles, setIsUploading, showNotification } = useFileStore();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newFiles = acceptedFiles.map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        size: file.size,
        preview: file.type.startsWith('image/') 
          ? URL.createObjectURL(file)
          : `/file-icons/${file.type.split('/')[1]}.png`,
        lastModified: file.lastModified,
        file,
      }));

      addFiles(newFiles);
      showNotification('success', `Successfully uploaded ${acceptedFiles.length} file(s)`);
    } catch (error) {
      showNotification('error', `Failed to upload files. Please try again.`);
    } finally {
      setIsUploading(false);
    }
  }, [addFiles, setIsUploading, showNotification]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_SIZE,
    maxFiles: MAX_FILES,
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors dark:bg-gray-700
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 shadow-lg hover:border-orange-500'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <Upload className="w-12 h-12 text-gray-400" />
        <p className="text-center font-semibold text-gray-600 dark:text-gray-300">
          {isDragActive
            ? 'Suelta los archivos aquí...'
            : 'Arrastre y suelte archivos aquí, o haga clic para seleccionar archivos'}
        </p>
        <p className="text-sm font-medium text-gray-500">
        Formatos aceptados: JPG, JPEG, PNG, DOC, DOCX, PDF (máximo 2 MB)
        </p>
      </div>
    </div>
  );
};
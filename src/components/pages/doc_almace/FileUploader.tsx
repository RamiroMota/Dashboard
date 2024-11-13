import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '../../utils/FileUtils';

interface FileUploaderProps {
  onUpload: (files: File[]) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: MAX_FILE_SIZE,
    maxFiles: 5,
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive ? (
          'Drop the files here...'
        ) : (
          <>
            "Arrastre y suelte archivos aquí, o haga clic para seleccionar archivos"
            <br />
            <span className="text-xs text-gray-500">
              (Un máximo de 5 archivos de 2 MB cada uno. Formatos admitidos: JPG, PNG, PDF, DOC, DOCX)
            </span>
          </>
        )}
      </p>
    </div>
  );
};
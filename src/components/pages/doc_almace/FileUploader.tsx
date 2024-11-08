import { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { ProgressBar } from '../doc_almace/ProgressBar';

interface FileUploaderProps {
  onFileUpload: (files: File[]) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const simulateUpload = useCallback((files: File[]) => {
    setIsUploading(true);
    const uploadInterval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          return 0;
        }
        return prevProgress + 10;
      });
    }, 500);

    setTimeout(() => {
      clearInterval(uploadInterval);
      setIsUploading(false);
      onFileUpload(files);
    }, 3000);
  }, [onFileUpload]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]); // Suponiendo que solo subes un archivo

    try {
      setIsUploading(true);
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir el archivo');
      }

      const result = await response.json();
      console.log('Archivo subido:', result);

      simulateUpload(acceptedFiles);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  }, [simulateUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.png,.jpg,.jpeg,.pdf,.doc,.docx',
    disabled: isUploading,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <Upload className="w-12 h-12 text-gray-400" />
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
            {isDragActive ? 'Suelta los archivos aquí' : isUploading ? 'Subiendo archivos...' : 'Arrastra y suelta archivos, o haz clic para seleccionar'}
          </p>
          <p className="text-sm dark:text-gray-300 text-gray-500">
            Soporta: PNG, JPG, JPEG, PDF, DOC, DOCX
          </p>
        </div>
      </div>

      {isUploading && (
        <div className="space-y-2">
          <ProgressBar progress={uploadProgress} />
          <p className="text-sm dark:text-gray-300 text-gray-600 text-center">
            Subiendo... {uploadProgress}%
          </p>
        </div>
      )}
    </div>
  );
};

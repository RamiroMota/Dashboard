import { useState, useEffect, useCallback } from 'react';
import { FileUploader } from './doc_almace/FileUploader';
import { ProgressBar } from './doc_almace/ProgressBar';
import { ErrorMessage } from './doc_almace/ErrorMessage';
import { LoadingSpinner } from './doc_almace/LoadingSpinner';
import { FileGrid } from './doc_almace/FileGrid';
import { Header } from './doc_almace/Header';
import { SearchBar } from './doc_almace/SearchControls';
import { FileItem, ViewMode } from '../types/file';
import { uploadFiles, getFiles, deleteFile, downloadFile } from '../types/fileUpload';

function FileUpload() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [fileType, setFileType] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>('grid');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFiles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedFiles = await getFiles();
      const sanitizedFiles = fetchedFiles.map(file => ({
        ...file,
        createdAt: new Date(file.createdAt).toISOString(),
        id: String(file.id), // Ensure ID is a string
        size: Number(file.size), // Ensure size is a number
      }));
      setFiles(sanitizedFiles);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load files';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFiles();
  },[loadFiles]);

  const handleUpload = async (newFiles: File[]) => {
    try {
      setUploadProgress(0);
      setError(null);
      const uploadedFiles = await uploadFiles(newFiles);
      const sanitizedFiles = uploadedFiles.map(file => ({
        ...file,
        createdAt: new Date(file.createdAt).toISOString(),
        id: String(file.id),
        size: Number(file.size),
      }));
      setFiles(prev => [...sanitizedFiles, ...prev]);
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload files';
      setError(errorMessage);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(null);
      await deleteFile(id);
      setFiles(prev => prev.filter(file => file.id !== id));
      setSelectedFiles(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete file';
      setError(errorMessage);
    }
  };

  const handleDownload = async (id: string, filename: string) => {
    try {
      setError(null);
      await downloadFile(id, filename);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to download file';
      setError(errorMessage);
    }
  };

  const toggleFileSelection = (id: string) => {
    setSelectedFiles(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !fileType || 
      (fileType === 'image' && file.type.startsWith('image/')) ||
      (fileType === 'document' && !file.type.startsWith('image/'));
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
          <Header view={view} onViewChange={setView} />
          <FileUploader onUpload={handleUpload} />
          
          {uploadProgress > 0 && (
            <div className="mt-4">
              <ProgressBar progress={uploadProgress} />
            </div>
          )}

          {error && <ErrorMessage message={error} />}

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            selectedType={fileType}
            onTypeChange={setFileType}
          />

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <FileGrid
              files={filteredFiles}
              view={view}
              selectedFiles={selectedFiles}
              onSelect={toggleFileSelection}
              onDownload={handleDownload}
              onDelete={handleDelete}
            />
          )}

          {!isLoading && filteredFiles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 font-medium">No files found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
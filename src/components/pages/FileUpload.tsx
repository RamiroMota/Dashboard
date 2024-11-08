import { useState, useMemo } from 'react';
import { FileUploader } from './doc_almace/FileUploader';
import { FileList } from './doc_almace/FileList';
import { SearchAndFilter } from './doc_almace/SearchAndFilter';
import { ViewToggle } from './doc_almace/ViewToggle';
import { FileItem, FileType } from '../types/file';
import { FolderOpen } from 'lucide-react';
import { getFileType } from '../utils/fileHelpers';

function FileUpload() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<FileType | 'all'>('all');
  const [isGridView, setIsGridView] = useState(true);

  const handleFileUpload = (uploadedFiles: File[]) => {
    const newFiles: FileItem[] = uploadedFiles.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      createdAt: new Date(),
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => {
      const fileToDelete = prev.find(file => file.id === id);
      if (fileToDelete?.url) {
        URL.revokeObjectURL(fileToDelete.url);
      }
      return prev.filter((file) => file.id !== id);
    });
  };

  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
      const fileType = getFileType(file.type);
      const matchesType = selectedType === 'all' || fileType === selectedType;
      return matchesSearch && matchesType;
    });
  }, [files, searchTerm, selectedType]);

  return (
    <div className="min-h-screen dark:bg-slate-800 rounded-lg bg-gray-50 shadow-lg shadow-gray-300 dark:shadow-none">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center space-x-4 mb-8">
          <FolderOpen className="w-8 h-8 text-orange-500" />
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">
            Gestor de Archivos
          </h1>
        </div>

        <div className="space-y-8">
          <FileUploader onFileUpload={handleFileUpload} />
          
          {files.length > 0 && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-lg font-semibold dark:text-slate-300 text-gray-700">
                  Archivos Subidos ({filteredFiles.length} de {files.length})
                </h2>
                <ViewToggle isGridView={isGridView} onToggle={() => setIsGridView(!isGridView)} />
              </div>

              <SearchAndFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedType={selectedType}
                onTypeChange={setSelectedType}
              />

              {filteredFiles.length > 0 ? (
                <FileList 
                  files={filteredFiles} 
                  onDelete={handleDelete}
                  isGridView={isGridView}
                />
              ) : (
                <div className="text-center py-12 dark:bg-gray-700 bg-white rounded-lg">
                  <p className="dark:text-gray-300 text-gray-500">No se encontraron archivos que coincidan con tu búsqueda</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
import { FileItem } from '../../types/file';
import { FileText, Image, File, Trash2, ExternalLink, CloudDownload } from 'lucide-react';
import { formatFileSize } from '../../utils/formatters';

interface FileListProps {
  files: FileItem[];
  onDelete: (id: string) => void;
  isGridView: boolean;
}

export const FileList: React.FC<FileListProps> = ({ files, onDelete, isGridView }) => {
  const getFileIcon = (type: string) => {
    if (type.startsWith('image')) return <Image className="w-6 h-6" />;
    if (type.includes('pdf') || type.includes('doc')) return <FileText className="w-6 h-6" />;
    return <File className="w-6 h-6" />;
  };

  const isImage = (type: string) => type.startsWith('image');

  if (isGridView) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-white dark:bg-slate-700 rounded-lg shadow-lg hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="aspect-video relative dark:bg-slate-600 bg-gray-400">
              {isImage(file.type) ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white dark:text-gray-300 transform scale-150">
                    {getFileIcon(file.type)}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium dark:text-slate-400 text-gray-900 truncate" title={file.name}>
                    {file.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-slate-300 mt-1">
                    {formatFileSize(file.size)}
                  </p>
                  <p className="text-xs text-gray-400  mt-1">
                    {new Date(file.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark:text-gray-400 dark:hover:text-white dark:hover:bg-orange-500 rounded-md text-blue-400  hover:text-white hover:bg-orange-500 transition-colors flex items-center gap-1 p-2 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Previsualizar
                </a>
                <button
                  onClick={() => onDelete(file.id)}
                  className="p-2 dark:text-gray-400 dark:hover:text-white dark:hover:bg-blue-500 rounded-full text-blue-400  hover:text-white hover:bg-blue-500 transition-colors"
                  title="Eliminar archivo"
                >
                  <CloudDownload className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(file.id)}
                  className="p-2 dark:text-gray-400 dark:hover:text-white dark:hover:bg-red-500 rounded-full text-blue-400  hover:text-white hover:bg-red-500 transition-colors"
                  title="Eliminar archivo"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Archivo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Tamaño
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-700">
            {files.map((file) => (
              <tr key={file.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 text-gray-400">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-300 truncate max-w-xs" title={file.name}>
                        {file.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-300">{formatFileSize(file.size)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    {new Date(file.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-3">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-orange-500"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <button
                      onClick={() => onDelete(file.id)}
                      className="text-gray-300 hover:text-blue-500"
                    >
                      <CloudDownload className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(file.id)}
                      className="text-gray-300 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
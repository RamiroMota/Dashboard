import { FileUploader } from './doc_almace/FileUploader';
import { SearchBar } from './doc_almace/SearchBar';
import { FilterBar } from './doc_almace/FilterBar';
import { FileList } from './doc_almace/FileList';
import { LoadingOverlay } from './doc_almace/LoadingOverlay';
import { Notification } from './doc_almace/Notification';
import { HardDrive } from 'lucide-react';
import { useFileStore } from './../store/useFileStore';

function App() {
  const { isUploading, notification, clearNotification } = useFileStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 rounded-lg">
      {isUploading && (
        <LoadingOverlay message="Subiendo archivos..." />
      )}

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={clearNotification}
        />
      )}

      <header className="bg-white  shadow-lg rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <HardDrive className="w-8 h-8 text-gray-800 dark:text-orange-600" />
            <h1 className="text-2xl font-bold text-gray-600">Mis Archivos</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <FileUploader />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar />
            </div>
            <FilterBar />
          </div>

          <FileList />
        </div>
      </main>
    </div>
  );
}

export default App;
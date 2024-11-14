import { create } from 'zustand';
import { FileItem, ViewMode } from '../types/file';

interface FileStore {
  files: FileItem[];
  viewMode: ViewMode;
  searchQuery: string;
  selectedFiles: Set<string>;
  filterType: string | null;
  isUploading: boolean;
  notification: {
    type: 'success' | 'error';
    message: string;
  } | null;
  setFiles: (files: FileItem[]) => void;
  addFiles: (newFiles: FileItem[]) => void;
  removeFile: (id: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  toggleFileSelection: (id: string) => void;
  clearSelection: () => void;
  setFilterType: (type: string | null) => void;
  setIsUploading: (value: boolean) => void;
  showNotification: (type: 'success' | 'error', message: string) => void;
  clearNotification: () => void;
}

export const useFileStore = create<FileStore>((set) => ({
  files: [],
  viewMode: 'grid',
  searchQuery: '',
  selectedFiles: new Set(),
  filterType: null,
  isUploading: false,
  notification: null,
  setFiles: (files) => set({ files }),
  addFiles: (newFiles) => set((state) => ({ files: [...state.files, ...newFiles] })),
  removeFile: (id) => set((state) => ({
    files: state.files.filter((file) => file.id !== id),
    selectedFiles: new Set([...state.selectedFiles].filter((fileId) => fileId !== id))
  })),
  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleFileSelection: (id) => set((state) => {
    const newSelection = new Set(state.selectedFiles);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    return { selectedFiles: newSelection };
  }),
  clearSelection: () => set({ selectedFiles: new Set() }),
  setFilterType: (type) => set({ filterType: type }),
  setIsUploading: (value) => set({ isUploading: value }),
  showNotification: (type, message) => set({ notification: { type, message } }),
  clearNotification: () => set({ notification: null }),
}));
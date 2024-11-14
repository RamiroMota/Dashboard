export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  preview: string;
  lastModified: number;
  file: File;
}

export type ViewMode = 'grid' | 'list';
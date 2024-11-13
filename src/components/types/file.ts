export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  createdAt: string;
  preview?: string;
}

export type ViewMode = 'grid' | 'list';
export type FileType = 'image/jpeg' | 'image/jpg' | 'image/png' | 'application/pdf' | 'application/msword' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
// Types for file management system
export interface FileItem {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
    createdAt: Date;
  }
  
  export type FileType = 'image' | 'document' | 'other';
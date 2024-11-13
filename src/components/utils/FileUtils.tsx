import { FileType } from '../types/file';

export const ACCEPTED_FILE_TYPES: FileType[] = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const getFileIcon = (type: string): string => {
  if (type.includes('image')) return '🖼️';
  if (type.includes('pdf')) return '📄';
  if (type.includes('word') || type.includes('doc')) return '📝';
  return '📎';
};
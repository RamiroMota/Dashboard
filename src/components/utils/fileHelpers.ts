import { FileType } from '../types/file';

export const getFileType = (mimeType: string): FileType => {
  if (mimeType.startsWith('image/')) {
    return 'image';
  }
  if (
    mimeType.includes('pdf') ||
    mimeType.includes('doc') ||
    mimeType.includes('sheet') ||
    mimeType.includes('presentation')
  ) {
    return 'document';
  }
  return 'other';
};
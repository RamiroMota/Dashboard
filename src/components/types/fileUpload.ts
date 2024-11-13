import axios from 'axios';
import { FileItem } from '../types/file';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const uploadFiles = async (files: File[]): Promise<FileItem[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  const { data } = await api.post('/upload', formData);
  return data;
};

export const getFiles = async (): Promise<FileItem[]> => {
  const { data } = await api.get('/files');
  return data;
};

export const deleteFile = async (id: string): Promise<void> => {
  await api.delete(`/files/${id}`);
};

export const downloadFile = async (id: string, filename: string): Promise<void> => {
  const response = await api.get(`/files/${id}/download`, {
    responseType: 'blob',
  });
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
export interface User {
    id: number | null;
    nombre: string;
    apellidos: string;
    correo: string;
    rol: string;
  }
  
  export interface Notification {
    id: number;
    message: string;
    date: string;
    read: boolean;
  }
  
  export interface BreadcrumbItem {
    label: string;
    path: string;
  }
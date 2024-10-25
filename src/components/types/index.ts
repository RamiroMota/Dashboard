export interface User {
    name: string;
    email: string;
    role: string;
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
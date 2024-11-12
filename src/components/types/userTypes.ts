export interface User {
    _id: string;
    Nombre: string;
    Apellidos: string;
    Correo: string;
    Password: string;  // Opcional en el front-end por seguridad
    Rol: string;
    roleName: string;
    Funcion: string;
    CreadoEl: string;  // Opcional, ya que se establece automáticamente
    ActualizadoEl: string;  // Opcional, ya que se establece automáticamente
  }  
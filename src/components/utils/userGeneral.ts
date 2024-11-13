import moment from 'moment-timezone';

// Función para eliminar los acentos
export const removeAccents = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Función para formatear fechas a dd-mm-aaaa en la zona horaria de Ciudad de México
export const formatDate = (date: string): string => {
  return moment(date)
    .tz('America/Mexico_City', true)
    .format('DD-MM-YYYY');
};

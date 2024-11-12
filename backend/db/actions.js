const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');  // Importar el modelo de User

// Configurar dotenv
dotenv.config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)

const getUsuarios = async () => {
  return User.aggregate([
    {
      $lookup: { // Realiza un "join" con la colección 'roles'
        from: 'roles',
        localField: 'Rol', // Campo en usuarios
        foreignField: 'roleId', // Campo en roles
        as: 'roleInfo', // Los resultados del join se guardarán en 'roleInfo'
      }
    },
    { $unwind: '$roleInfo' }, // Extrae el objeto roleInfo del array
    {
      $project: { // Proyecta solo los campos que necesitamos
        Nombre: 1,
        Apellidos: 1,
        Correo: 1,
        Rol: 1,
        Funcion:1,
        roleName: '$roleInfo.roleName', // Incluye roleName del objeto 'roleInfo'
        CreadoEl: 1,
        ActualizadoEl: 1
      }
    }
  ]);
};

module.exports = { getUsuarios };
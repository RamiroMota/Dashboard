const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');  // Importar el modelo de User

// Configurar dotenv
dotenv.config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

const getUsuarios = async () => {
    try {
      const usuarios = await User.find().exec({ timeout: 30000 });
      return usuarios.map(usuario => ({
        id: usuario._id,
        nombre: usuario.Nombre,
        apellidos: usuario.Apellidos,
        correo: usuario.Correo,
        rol: usuario.Rol,
        funcion: usuario.Funcion
      }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

module.exports = { getUsuarios };
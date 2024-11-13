const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');  // Importar el modelo de User

// Configurar dotenv
dotenv.config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)

const getUsuarios = async () => {
  try {
    const usuarios = await User.find();
    return usuarios;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const agregarUsuario = async (nuevoUsuario) => {
  try {
    // Crear un nuevo usuario en la base de datos
    const usuario = new User(nuevoUsuario);
    await usuario.save();  // Guardar el usuario en la base de datos
    return usuario;  // Devolver el usuario creado
  } catch (error) {
    console.error(error);
    throw error;  // Propagar el error si ocurre
  }
};

module.exports = { getUsuarios, agregarUsuario };

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Asegúrate de que la ruta sea correcta
const dotenv = require('dotenv');
const { agregarUsuario } = require('../db/actions');

// Cargar las variables de entorno
dotenv.config();

const router = express.Router();

// Ruta para autenticar un usuario (login)
router.post('/login', async (req, res) => {
  const { Correo, Password } = req.body;

  try {
    // Paso 1: Buscar al usuario directamente en la colección de usuarios
    const user = await User.findOne({ Correo });

    // Paso 2: Verificar si se encontró el usuario
    if (!user) {
      return res.status(401).json({ message: 'Datos incorrectos, favor de verificar' });
    }

    // Paso 3: Verificar que la contraseña coincida (sin bcrypt)
    const isPasswordValid = Password === user.Password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Datos incorrectos, favor de verificar' });
    }

    // Paso 4: Crear un token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET
    );

    // Paso 5: Responder con el token y los datos del usuario
    res.status(200).json({
      message: 'Autenticación exitosa',
      token: token,
      user: {
        name: `${user.Nombre} ${user.Apellidos}`,
        email: user.Correo,
        role: user.Rol // El rol ahora es directamente un string
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para obtener todos los usuarios
const { getUsuarios } = require('../db/actions'); // Importar getUsuarios para visualización de colección usuarios en tabla
router.get('/', async (req, res) => {
  try {
    const usuarios = await getUsuarios();  // Usar la función getUsuarios
    res.status(200).json({ usuarios });     // Enviar los usuarios como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

//Ruta para crear usuarios
router.post('/crear', async (req, res) => {
  const { Nombre, Apellidos, Correo, Contraseña, Rol, Funcion } = req.body;

  // Valida los datos básicos
  if (!Nombre || !Apellidos || !Correo || !Contraseña || !Rol || !Funcion) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Crear usuario
    const usuarioCreado = await agregarUsuario({ Nombre, Apellidos, Correo, Contraseña, Rol, Funcion });
    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: usuarioCreado
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
});

module.exports = router;
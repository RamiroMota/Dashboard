const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

const router = express.Router();

// Ruta para autenticar un usuario (login)
router.post('/login', async (req, res) => {
  const { Correo, Password } = req.body;

  try {
    // Buscar al usuario por correo
    const user = await User.findOne({ Correo });
    if (!user) {
      return res.status(401).json({ message: 'Datos incorrectos, favor de verificar' });
    }

    // Verificar que la contraseña coincida
    const isPasswordValid = Password === user.Password;  // Asegúrate de usar bcrypt en la comparación de contraseñas
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Datos incorrectos, favor de verificar' });
    }

    // Crear un token JWT
    const token = jwt.sign(
      { userId: user.id }, // Datos del usuario que quieres incluir en el token
      process.env.JWT_SECRET // Usar la clave secreta desde el archivo .env

    );

    // Responder con el token y los datos del usuario
    res.status(200).json({
      message: 'Autenticación exitosa',
      token: token,  // Incluir el token en la respuesta
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;

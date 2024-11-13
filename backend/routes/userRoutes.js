const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Asegúrate de que la ruta sea correcta
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

const router = express.Router();

// Ruta para autenticar un usuario (login)
router.post('/login', async (req, res) => {
  const { Correo, Password } = req.body;

  try {
    // Paso 1: Buscar al usuario y hacer el `lookup` para obtener `roleName`
    const user = await User.aggregate([
      { $match: { Correo } }, // Busca el usuario por correo
      {
        $lookup: { // Hacer un "join" con la colección roles
          from: 'roles',
          localField: 'Rol', // Campo en usuarios
          foreignField: 'roleId', // Campo en roles
          as: 'roleInfo' // El resultado se guardará en roleInfo
        }
      },
      { $unwind: '$roleInfo' }, // Extrae el objeto roleInfo de un array
      {
        $project: { // Selecciona solo los campos necesarios
          Nombre: 1,
          Apellidos: 1,
          Correo: 1,
          Password: 1,
          Rol: 1,
          roleName: '$roleInfo.roleName' // Agrega roleName al resultado
        }
      }
    ]);

    // Paso 2: Verificar si se encontró el usuario
    if (!user.length) {
      return res.status(401).json({ message: 'Datos incorrectos, favor de verificar' });
    }

    const [userData] = user; // Extrae el usuario del array

    // Paso 3: Verificar que la contraseña coincida (sin bcrypt)
    const isPasswordValid = Password === userData.Password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Datos incorrectos, favor de verificar' });
    }

    // Paso 4: Crear un token JWT
    const token = jwt.sign(
      { userId: userData._id },
      process.env.JWT_SECRET
    );

    // Paso 5: Responder con el token y los datos del usuario, incluyendo `roleName`
    res.status(200).json({
      message: 'Autenticación exitosa',
      token: token,
      user: {
        name: `${userData.Nombre} ${userData.Apellidos}`,
        email: userData.Correo,
        role: userData.Rol,
        roleName: userData.roleName // Aquí se incluye el `roleName` obtenido
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para obtener todos los usuarios
const { getUsuarios } = require('../db/actions'); //importar getusuarios para visualización de colección usuarios en tabla
router.get('/', async (req, res) => {
  try {
    const usuarios = await getUsuarios();  // Usar la función getUsuarios
    res.status(200).json({ usuarios });     // Enviar los usuarios como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Ruta para obtener los roles
router.get('/roles', async (req, res) => {
  try {
    // Realiza la consulta para obtener los roles
    const roles = await User.aggregate([
      {
        $lookup: {
          from: 'roles',
          localField: 'Rol',
          foreignField: 'roleId',
          as: 'roleInfo',
        },
      },
      { $unwind: '$roleInfo' },
      {
        $project: {
          roleName: '$roleInfo.roleName',
        },
      },
    ]);

    // Extrae los nombres de los roles de la consulta
    const roleNames = roles.map(role => role.roleName);

    // Devolver los nombres de los roles en formato JSON
    res.json(roleNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener roles' });
  }
});

module.exports = router;
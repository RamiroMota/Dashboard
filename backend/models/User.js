const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Nombre: { type: String, required: true },
  Apellidos: { type: String, required: true },
  Correo: { type: String, required: true },
  Password: { type: String, required: true },
  Rol: { type: String, required: true },
  Funcion: { type: String, required: true },
});

const User = mongoose.model('Usuarios', userSchema);
module.exports = User;
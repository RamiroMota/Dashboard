const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Id: { type: Number, required: true },
  Nombre: { type: String, required: true },
  Apellidos: { type: String, required: true },
  Correo: { type: String, required: true },
  Password: { type: String, required: true },
  Rol: { type: String, required: true },
  Funcion: { type: String, required: true },
}, {
  timestamps: { createdAt: 'CreadoEl', updatedAt: 'ActualizadoEl' }  // Configura los nombres personalizados
});

const User = mongoose.model('Usuarios', userSchema);
module.exports = User;
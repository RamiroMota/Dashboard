// Importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const fs = require('fs');
const { GridFSBucket } = require('mongodb');

// Crear una instancia de Express
const app = express();
// Configurar el puerto
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar dotenv
dotenv.config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});







// Conexión a MongoDB y configuración de GridFS
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  gfs = new GridFSBucket(conn.db, {
    bucketName: 'uploads',
  });
});

// Rutas
const userRoutes = require('./routes/userRoutes');
app.use('/api/usuarios/', userRoutes);

// Rutas de carga de archivos
app.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm();
  form.maxFileSize = 2 * 1024 * 1024;  // 2MB máximo

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Archivo demasiado grande o error al procesar el archivo' });
    }

    const file = files.file[0];  // Accedemos al archivo

    // Validación de tipo de archivo
    const validMimeTypes = [
      'image/png', 'image/jpeg', 'application/pdf', 
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!validMimeTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Tipo de archivo no permitido' });
    }

    // Guardar archivo en GridFS
    const uploadStream = gfs.openUploadStream(file.originalFilename, {
      contentType: file.mimetype,
    });

    fs.createReadStream(file.filepath).pipe(uploadStream);

    uploadStream.on('finish', () => {
      res.status(200).json({
        message: 'Archivo subido exitosamente',
        fileId: uploadStream.id,  // ID del archivo en MongoDB
      });
    });

    uploadStream.on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: 'Error al guardar el archivo en la base de datos' });
    });
  });
});

// Ruta para descargar el archivo desde MongoDB
app.get('/file/:id', (req, res) => {
  const fileId = req.params.id;

  const downloadStream = gfs.openDownloadStream(mongoose.Types.ObjectId(fileId));

  downloadStream.on('data', (chunk) => {
    res.write(chunk);
  });

  downloadStream.on('end', () => {
    res.end();
  });

  downloadStream.on('error', (err) => {
    res.status(404).json({ error: 'Archivo no encontrado' });
  });
});

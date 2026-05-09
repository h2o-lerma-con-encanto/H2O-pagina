/* Conexión a Cloudinary (almacenamiento de fotos) */
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Lee CLOUDINARY_URL automáticamente desde el archivo .env
cloudinary.config();

// Verificar que la conexión funciona al arrancar el servidor
cloudinary.api.ping()
  .then(() => console.log("¡Conexión exitosa a Cloudinary!"))

  .catch((error) => {
    // Por si algo ocurre
    console.error('Error al conectar con Cloudinary:', error.message);
    process.exit(1); /* Cierra si hay algo mal */
  });

module.exports = cloudinary;
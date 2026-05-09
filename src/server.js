const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/database');
const cloudinary = require('./config/cloudinary');

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar DB
connectDB();

// Rutas existentes
app.use('/api/auth', require('./routes/authRoutes'));

// Servir archivos estáticos de client/
app.use(express.static(path.join(__dirname, '..', 'client')));

// Ruta raíz -> main page index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
});

// Si se ejecuta en modo de desarrollo o producción, manda mensaje de confirmación
// y ejecuta en el puerto asignado
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

module.exports = app;

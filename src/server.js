const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/database');

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar DB
connectDB();

// Rutas existentes

// Servir archivos estáticos de client/
app.use(express.static(path.join(__dirname, '..', 'client')));

// Ruta raíz -> main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});


if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

module.exports = app;

const express = require('express');
const router = express.Router();

const {
  registrarCuenta,
  iniciarSesion
} = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', registrarCuenta);   /* Crear pedido */

// POST /api/auth/login
router.put('/login', iniciarSesion);     /* para editar el pedido */

module.exports = router;
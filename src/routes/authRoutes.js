const express = require('express');
const router = express.Router();

const {
  registrarCuenta,
  iniciarSesion,
  recuperarPassword,
  restablecerPassword
} = require('../controllers/authController');

// POST /api/auth/register — sin auth; crea cuenta y envía correo de verificación
router.post('/register', registrarCuenta);

// POST /api/auth/login — sin auth; devuelve JWT con expiración de 3 horas
router.post('/login', iniciarSesion);

// POST /api/auth/recuperar-password — sin auth; recibe email, genera token y envía correo
router.post('/recuperar-password', recuperarPassword);

// POST /api/auth/restablecer-password?token=X — sin auth; valida token y actualiza password
router.post('/restablecer-password', restablecerPassword);

module.exports = router;
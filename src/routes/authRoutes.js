/* Rutas para autenticación de sesión y token */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Para generar las rutas
const router = express.Router();

// Helper: generar token con id, nombre y rol del Usuario
const generateToken = (user) => {
  const payload = {
    id: user._id,
    name: user.nombre,
    role: user.rol
  };
  const expiresIn = process.env.TOKEN_EXPIRES_IN;
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  // Revisa los datos ingresados en el formulario de registro
  try {
    const { nombre, correo, password, rol } = req.body;
    if (!correo || !password) return res.status(400).json({ message: 'Se necesita correo y contraseña' });

    // Revisa que no exista una cuenta con el mismo correo
    const existing = await CuentaUsuario.findOne({ correo });
    if (existing) return res.status(409).json({ message: 'El usuario ya existe' });

    // Encriptació de contraseña
    const salt = await bcrypt.genSalt(10); //caracteres random
    const hashed = await bcrypt.hash(password, salt);

    // Crea la cuenta y genera un token
    const user = await CuentaUsuario.create({ nombre, correo, password: hashed, rol });
    const token = generateToken(user);

    res.status(201).json({
      message: 'Usuario creado',
      user: { id: user._id, nombre: user.nombre, correo: user.correo },
      token,
    });

    // Si algo falla, regresa error
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  // Revisa los datos ingresados en el formulario de login
  try {
    const { correo, password } = req.body;
    if (!correo || !password) return res.status(400).json({ message: 'Se necesita correo y contraseña' });

    // Si el usuario se equivoca en la contraseña o la cuenta no existe
    const user = await CuentaUsuario.findOne({ correo }).select('+password');
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas' });
    
    // Para actualizar el lastLogin en la base de datos
    user.lastLogin = new Date();
    await user.save();

    // Crea un token
    const token = generateToken(user);
    res.json({
      message: 'Autenticado',
      user: { id: user._id, nombre: user.nombre, correo: user.correo, rol: user.rol },
      token,
    });

    // Si algo falla, regresa error
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router; //para usar las rutas en server.js

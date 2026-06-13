const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getUsuarios,
  getUsuarioById,
  getPerfilPublico, // NUEVA: devuelve solo campos públicos; ver sección 11.4 del CLAUDE.md
  createUsuario,
  updateUsuario,
  deleteUsuario,
  cambiarPassword,
  verificarCorreo,
  desuscribir
} = require('../controllers/usuarioController');

// Rutas estáticas antes que /:id para evitar conflictos de matching

// POST /api/usuarios/desuscribir?token=X — sin auth; token en query param
router.post('/desuscribir', desuscribir);

// GET /api/usuarios — admin, prestador (lista con filtros de rol)
router.get('/', auth, getUsuarios);

// GET /api/usuarios/:id/perfil-publico — NUEVA: auth requerido; solo expone campos públicos para rol voluntario+
router.get('/:id/perfil-publico', auth, getPerfilPublico); // NUEVA

// GET /api/usuarios/:id — admin, prestador, propio
router.get('/:id', auth, getUsuarioById);

// POST /api/usuarios — admin; creación manual de cuenta con rol asignado (auto-registro va por /api/auth/register)
router.post('/', auth, createUsuario);

// PUT /api/usuarios/:id — propio (datos personales) o admin
router.put('/:id', auth, updateUsuario);

// DELETE /api/usuarios/:id — soft delete (activo: false); bloqueado para roles asignados sin pasar por admin
router.delete('/:id', auth, deleteUsuario);

// POST /api/usuarios/:id/cambiar-password — propio; requiere password actual en body
router.post('/:id/cambiar-password', auth, cambiarPassword);

// POST /api/usuarios/:id/verificar-correo?token=X — sin auth; token en query param
router.post('/:id/verificar-correo', verificarCorreo);

module.exports = router;

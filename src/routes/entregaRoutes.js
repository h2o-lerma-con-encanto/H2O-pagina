const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getEntregas,
  getEntregaById,
  createEntrega,
  updateEntrega,
  deleteEntrega,
  validarEntrega,
  rechazarEntrega // NUEVA: espejo de validarEntrega para el estado "rechazada"
} = require('../controllers/entregaController');

// GET /api/entregas — propio, centro_acopio, admin; acepta query params ?usuario_id=X&centro_id=Y&estado=Z
router.get('/', auth, getEntregas);

// GET /api/entregas/:id — propio, centro_acopio receptor, admin
router.get('/:id', auth, getEntregaById);

// POST /api/entregas — usuario+; imagen sube vía POST /api/upload/imagen antes de llamar este endpoint
router.post('/', auth, createEntrega);

// PUT /api/entregas/:id — propio (solo si estado === 'pendiente')
router.put('/:id', auth, updateEntrega);

// DELETE /api/entregas/:id — admin, propio (solo si estado === 'pendiente')
router.delete('/:id', auth, deleteEntrega);

// POST /api/entregas/:id/validar — centro_acopio (receptor), admin; otorga puntos al donador
router.post('/:id/validar', auth, validarEntrega);

// POST /api/entregas/:id/rechazar — centro_acopio (receptor), admin — NUEVA
router.post('/:id/rechazar', auth, rechazarEntrega); // NUEVA: el enum "rechazada" necesita su endpoint de acción; no otorga puntos

module.exports = router;

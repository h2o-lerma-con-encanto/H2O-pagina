const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getEventos,
  getEventoById,
  createEvento,
  updateEvento,
  deleteEvento
} = require('../controllers/eventoController');

// GET /api/eventos — público; acepta query params ?activo=true&page=N
router.get('/', getEventos);

// GET /api/eventos/:id — público
router.get('/:id', getEventoById);

// POST /api/eventos — admin, prestador, centro_acopio
router.post('/', auth, createEvento);

// PUT /api/eventos/:id — admin, prestador, centro_acopio (propio)
router.put('/:id', auth, updateEvento);

// DELETE /api/eventos/:id — admin, prestador, centro_acopio (propio)
router.delete('/:id', auth, deleteEvento);

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getValoraciones,
  getValoracionById,
  createValoracion,
  updateValoracion,
  deleteValoracion
} = require('../controllers/valoracionController');

// GET /api/valoraciones — público; acepta query param ?centro_id=X
router.get('/', getValoraciones);

// GET /api/valoraciones/:id — público
router.get('/:id', getValoracionById);

// POST /api/valoraciones — usuario+; índice único compuesto centro_id + usuario_id
router.post('/', auth, createValoracion);

// PUT /api/valoraciones/:id — propio; también usado por centro_acopio para agregar respuesta (campo respuesta + encargado_id)
router.put('/:id', auth, updateValoracion);

// DELETE /api/valoraciones/:id — propio o admin
router.delete('/:id', auth, deleteValoracion);

module.exports = router;

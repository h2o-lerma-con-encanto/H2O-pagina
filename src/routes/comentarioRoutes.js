const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getComentarios,
  getComentarioById,
  createComentario,
  updateComentario,
  deleteComentario,
  moderarComentario
} = require('../controllers/comentarioController');

// GET /api/comentarios — público; requiere query params ?contexto_tipo=X&contexto_id=Y
router.get('/', getComentarios);

// GET /api/comentarios/:id — público
router.get('/:id', getComentarioById);

// POST /api/comentarios — usuario+
router.post('/', auth, createComentario);

// PUT /api/comentarios/:id — propio
router.put('/:id', auth, updateComentario);

// DELETE /api/comentarios/:id — propio o admin
router.delete('/:id', auth, deleteComentario);

// POST /api/comentarios/:id/moderar — centro_acopio, prestador, admin (oculto: true, no borrado)
router.post('/:id/moderar', auth, moderarComentario);

module.exports = router;

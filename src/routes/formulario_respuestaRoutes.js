const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getFormularios,
  getFormularioById,
  createFormulario,
  updateFormulario,
  deleteFormulario,
  aprobarFormulario,
  rechazarFormulario // NUEVA: espejo de aprobarFormulario para el estado "rechazada"
} = require('../controllers/formulario_respuestasController');

// GET /api/formularios — admin, prestador; acepta query params ?tema=X&estado=Y
router.get('/', auth, getFormularios);

// GET /api/formularios/:id — admin, prestador, propio
router.get('/:id', auth, getFormularioById);

// POST /api/formularios — sin auth obligatorio: tema "general" es público; otros temas requieren usuario+
// La validación condicional del token y del campo usuario_id (obligatorio si tema !== "general") va en el controller
router.post('/', createFormulario);

// PUT /api/formularios/:id — admin, prestador (editar estado o notas internas)
router.put('/:id', auth, updateFormulario);

// DELETE /api/formularios/:id — admin
router.delete('/:id', auth, deleteFormulario);

// POST /api/formularios/:id/aprobar — admin, prestador; cambia automáticamente el rol del usuario solicitante
router.post('/:id/aprobar', auth, aprobarFormulario);

// POST /api/formularios/:id/rechazar — admin, prestador — NUEVA
router.post('/:id/rechazar', auth, rechazarFormulario); // NUEVA: el enum "rechazada" necesita su endpoint de acción

module.exports = router;

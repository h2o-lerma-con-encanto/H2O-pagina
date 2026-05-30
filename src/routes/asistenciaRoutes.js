const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getAsistencias,
  getAsistenciaById,
  createAsistencia,
  deleteAsistencia,
  validarAsistencia
} = require('../controllers/asistenciaController');

// GET /api/asistencias — propio, centro_acopio, prestador, admin; acepta query param ?evento_id=X
router.get('/', auth, getAsistencias);

// GET /api/asistencias/:id — propio, organizador del evento, admin
router.get('/:id', auth, getAsistenciaById);

// POST /api/asistencias — usuario+; inscribirse a un evento; índice único compuesto usuario_id + evento_id
router.post('/', auth, createAsistencia);

// DELETE /api/asistencias/:id — propio (desinscribirse) o admin
router.delete('/:id', auth, deleteAsistencia);

// POST /api/asistencias/:id/validar — centro_acopio (organizador), admin; marca asistio: true y otorga puntos
router.post('/:id/validar', auth, validarAsistencia);

module.exports = router;

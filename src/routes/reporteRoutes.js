const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getReportes,
  getReporteById,
  createReporte,
  deleteReporte,
  resolverReporte
} = require('../controllers/reporteController');

// GET /api/reportes — admin, prestador, centro_acopio (filtrados por contexto propio); acepta query param ?estado=pendiente
router.get('/', auth, getReportes);

// GET /api/reportes/:id — admin, prestador, centro_acopio
router.get('/:id', auth, getReporteById);

// POST /api/reportes — usuario+; polimórfico vía contexto_tipo + contexto_id
router.post('/', auth, createReporte);

// DELETE /api/reportes/:id — admin
router.delete('/:id', auth, deleteReporte);

// POST /api/reportes/:id/resolver — admin, prestador, centro_acopio (en su contexto)
router.post('/:id/resolver', auth, resolverReporte);

module.exports = router;

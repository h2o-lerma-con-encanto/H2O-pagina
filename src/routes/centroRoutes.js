const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getCentros,
  getCentroById,
  createCentro,
  updateCentro,
  deleteCentro
} = require('../controllers/centroController');

// GET /api/centros — público; acepta query params ?estado=X&activo=true
router.get('/', getCentros);

// GET /api/centros/:id — público
router.get('/:id', getCentroById);

// POST /api/centros — admin
router.post('/', auth, createCentro);

// PUT /api/centros/:id — admin, centro_acopio (propio)
router.put('/:id', auth, updateCentro);

// DELETE /api/centros/:id — admin (soft delete: activo: false)
router.delete('/:id', auth, deleteCentro);

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getNoticias,
  getNoticiaById,
  createNoticia,
  updateNoticia,
  deleteNoticia
} = require('../controllers/noticiaController');

// GET /api/noticias — público; acepta query params ?categoria=X&page=N
router.get('/', getNoticias);

// GET /api/noticias/:id — público
router.get('/:id', getNoticiaById);

// POST /api/noticias — admin, prestador
router.post('/', auth, createNoticia);

// PUT /api/noticias/:id — admin, prestador
router.put('/:id', auth, updateNoticia);

// DELETE /api/noticias/:id — admin, prestador (soft delete)
router.delete('/:id', auth, deleteNoticia);

module.exports = router;

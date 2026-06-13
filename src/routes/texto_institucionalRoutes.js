const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getTextos,
  getTextoByClave,
  updateTexto
} = require('../controllers/texto_institucionalController');

// GET /api/textos — público; lista todas las claves y contenidos
router.get('/', getTextos);

// GET /api/textos/:clave — público; usa clave (mision, vision, etc.) no _id
router.get('/:clave', getTextoByClave);

// PUT /api/textos/:clave — admin, prestador (nunca se crean ni eliminan en runtime)
router.put('/:clave', auth, updateTexto);

module.exports = router;

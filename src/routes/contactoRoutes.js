const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getContactos,
  getContactoById,
  createContacto,
  updateContacto,
  deleteContacto
} = require('../controllers/contactoController');

// GET /api/contactos — admin, prestador, centro_acopio; acepta query param ?centro_id=X
router.get('/', auth, getContactos);

// GET /api/contactos/:id — admin, prestador, centro_acopio (propio)
router.get('/:id', auth, getContactoById);

// POST /api/contactos — admin, prestador, centro_acopio
router.post('/', auth, createContacto);

// PUT /api/contactos/:id — admin, prestador, centro_acopio (propio)
router.put('/:id', auth, updateContacto);

// DELETE /api/contactos/:id — admin, prestador, centro_acopio (propio)
router.delete('/:id', auth, deleteContacto);

module.exports = router;

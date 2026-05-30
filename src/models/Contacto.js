/* Modelo para el esquema de Contacto */
const mongoose = require('mongoose');
const audit = require('../middleware/plugginAudit');

const contactoSchema = new mongoose.Schema({

  // is_encargado_centro: Marca al contacto como encargado principal del centro
  is_encargado_centro: {
    type: Boolean,
    required: true,
    default: true
  },

  // centro_acopio_id: Centro al que pertenece el contacto
  // -> Obligatorio si is_encargado_centro es true
  centro_acopio_id: {
    // Centro — Centro de Acopio del contacto
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Centro',
  },

  // nombre: Nombre completo de la persona
  nombre: {
    type: String,
    trim: true,
    maxlength: 200,
    required: true
  },

  // telefono: Teléfono con LADA; validar formato
  telefono: {
    type: String,
    trim: true,
    maxlength: 10,
    required: true
  },

  // email: Correo electrónico (extra al de la cuenta de usuario, si existe)
  email: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Ingresa un correo válido'],
    trim: true, 
    lowercase: true,
    minlength: 6,
    maxlength: 100,
  },

  // otro: Otro tipo de contacto (ej. WhatsApp, Telegram)
  otro: {
    type: String,
    trim: true,
    maxlength: 50
  }
},
  {
    collection: 'contactos',
    timestamps: {
      createdAt: 'created_at', // Para la creación en MongoDB
      updatedAt: 'modified_at' // Y este para cada actualización
    }
  }
)

// Atributos estándar y operaciones al guardar/actualizar
contactoSchema.plugin(audit);

// Índice simple para consultar todos los contactos de un centro sin escanear la colección entera
contactoSchema.index({ centro_acopio_id: 1 });

module.exports = mongoose.model('Contacto', contactoSchema);
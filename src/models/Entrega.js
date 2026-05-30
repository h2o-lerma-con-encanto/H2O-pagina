/* Modelo para el esquema de Entrega */
const mongoose = require('mongoose');
const audit = require('../middleware/plugginAudit');

const entregaSchema = new mongoose.Schema({
  // centro_acopio_id: Centro donde se entregó el cascarón
  centro_acopio_id: {
    // Centro — centro receptor de la entrega
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Centro',
    required: true
  },

  // usuario_id: Donador que hizo la entrega
  usuario_id: {
    // Usuario — gana puntos solo si la entrega es validada
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },

  // fecha_entrega: Cuándo se entregó el cascarón
  fecha_entrega: {
    type: Date,
    required: true
  },

  // cantidad_kg: Cantidad entregada en kilogramos
  cantidad_kg: {
    type: Number,
    min: 0,
    max: 99999,
    required: true,
    default: 1
  },

  // puntuacion: Puntos que el usuario gana si se valida la entrega, calculado a partir de cantidad_kg
  puntuacion: {
    type: Number,
    min: 1,
    required: true,
    default: 1
  },

  // foto_url: Foto de evidencia en Cloudinary (ancho máx 800 px, compresión agresiva)
  //~ Retención: null después de 3 meses si validada, 30 días si rechazada
  foto_url: {
    type: String,
// Regex — Enlace válido de Cloudinary
    match: [/^https:\/\/res\.cloudinary\.com\/.+\/.+\/.+\/.+\/.+\/.+\..{1,4}/,
           'La URL debe ser un link de Cloudinary'],
    trim: true,
    required: true,
    unique: true,
    sparse: true
  },

  // estado: Estado en el flujo de validación
  estado: {
    type: String,
    enum: ['pendiente','validada','rechazada'],
    required: true,
    default: 'pendiente'
  },

  // validada_por: Cuenta del centro o admin que validó
  // -> Sólo presente si estado !== 'pendiente'
  validada_por: {
    // Usuario — Administrador o validador de la entrega
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },

  // fecha_validacion: Cuándo se validó
  // -> Sólo presente si estado !== 'pendiente'
  fecha_validacion: {
    type: Date
  },

  // notas: Notas o motivo de rechazo; visible para el usuario puede como motivo de rechazo
  // -> Obligatorio si estado == 'rechazada'
  notas: {
    type: String,
    maxlength: 500,
    trim: true
  }

},
  {
    collection: 'entregas',
    timestamps: {
      createdAt: 'created_at', // Para la creación en MongoDB
      updatedAt: 'modified_at' // Y este para cada actualización
    }
  }
)

// Atributos estándar y operaciones al guardar/actualizar
entregaSchema.plugin(audit);

// Índice simple para consultar todas las entregas a un centro sin escanear la colección entera
entregaSchema.index({ centro_acopio_id: 1 });

// Índice simple para consultar todas las entregas de un usuario sin escanear la colección entera
entregaSchema.index({ usuario_id: 1 });

module.exports = mongoose.model('Entrega', entregaSchema);
/* Modelo para el esquema de Evento */
const mongoose = require('mongoose');
const audit = require('../middleware/plugginAudit');

const eventoSchema = new mongoose.Schema({

  // titulo: Título del evento
  titulo: {
    type: String,
    minlength: 3,
    maxlength: 100,
    trim: true,
    required: true
  },

  // descripcion: Descripción larga del evento
  descripcion: {
    type: String,
    minlength: 30,
    trim: true,
    required: true
  },

  // fecha_inicio: Fecha y hora de inicio (ISO 8601)
  fecha_inicio: {
    type: Date,
    required: true
  },

  // fecha_fin: Fecha y hora de fin, opcional
  fecha_fin: {
    type: Date,
  },

  // ubicacion: Texto de ubicación visible al usuario
  ubicacion: {
    type: String,
    trim: true,
    required: true
  },

  // url_google_maps: Link a Google Maps
  url_google_maps: {
    type: String,
    // Regex — Enlace de google maps
    match: [/^https:\/\/maps\.app\.goo\.gl\/.{17}/, 
           'La URL debe ser un link de Google Maps'],
    trim: true
  },

  // imagen_url: Imagen del evento en Cloudinary
  imagen_url: {
    type: String,
    // Regex — Enlace válido de Cloudinary
    match: [/^https:\/\/res\.cloudinary\.com\/.+\/.+\/.+\/.+\/.+\/.+\..{1,4}/,
           'La URL debe ser un link de Cloudinary'],
    trim: true
  },

  // puntuacion: Puntos que los usuarios ganan si asisten
  puntuacion: {
    type: Number,
    min: 1,
    required: true,
    default: 1
  },

  // cupo_maximo: Límite de inscritos; vacío = sin límite
  cupo_maximo: {
    type: Number,
    min: 1,
  },

  // encargado_id: Organizador o encargado, además del administrador creador, del evento
  encargado_id: {
    // Contacto — a quién buscar en el evento, para dudas, etc.
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contacto'
  },

  // centros_relacionados: Centros relacionados con el evento
  centros_relacionados: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Centro',
    default: []
  },

  // publicado: false = borrador, true = visible al público
  publicado: {
    type: Boolean,
    required: true,
    default: false
  },

  // notificar_usuarios: Si se envía notificación al publicar
  notificar_usuarios: {
    type: Boolean,
    required: true,
    default: true
  },

  // notificacion_enviada: true cuando ya se envió correo
  notificacion_enviada: {
    type: Boolean,
    required: true,
    default: false
  },

  // notificacion_fecha: Fecha de envío de las notificaciones
  // -> Sólo presente si notificacion_enviada es true
  notificacion_fecha: {
    type: Date
  },

  // pendiente_notificar: La función programada lo procesa cuando es true
  pendiente_notificar: {
    type: Boolean,
    required: true,
    default: false
  },

  // num_notificados: Cantidad de usuarios notificados
  num_notificados: {
    type: Number,
    min: 0,
    required: true,
    default: 0
  }
},
  {
    collection: 'eventos',
    timestamps: {
      createdAt: 'created_at', // Para la creación en MongoDB
      updatedAt: 'modified_at' // Y este para cada actualización
    }
  }
)

// Atributos estándar y operaciones al guardar/actualizar
eventoSchema.plugin(audit);

// Índice simple para consultar todos los eventos de un centro sin escanear la colección entera
eventoSchema.index({ centros_relacionados: 1 });

module.exports = mongoose.model('Evento', eventoSchema);
/* Modelo para el esquema de Noticia */
const mongoose = require('mongoose');
const audit = require('../middleware/plugginAudit');

const noticiaSchema = new mongoose.Schema({

  // titulo: Título de la noticia
  titulo: {
    type: String,
    minlength: 3,
    maxlength: 100,
    trim: true,
    required: true
  },

  // contenido: Contenido completo con formato enriquecido (HTML)
  contenido: {
    type: String,
    minlength: 10,
    trim: true,
    required: true
  },

  // imagen_url: Imagen destacada en Cloudinary
  imagen_url: {
    type: String,
    // Regex — Enlace válido de Cloudinary
    match: [/^https:\/\/res\.cloudinary\.com\/.+\/.+\/.+\/.+\/.+\/.+\..{1,4}/,
      'La URL debe ser un link de Cloudinary'],
    trim: true
  },

  // categorias: Etiquetas para filtrar; puede tener varias
  /* POR DEFINIR: Categorías adicionales */
  categorias: {
    type: [String],
    enum: ['ciencia','comunidad','logros','contribuciones','anuncio','otro'],
    default: []
  },

  // autor_id: Cuenta admin o prestador que escribió o editó
  autor_id: {
    // Usuario — admin o prestador_servicio_social
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },

  // centros_relacionados: Centros mencionados en la noticia
  centros_relacionados: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Centro',
    default: []
  },

  // publicada: false = borrador, true = visible al público
  publicada: {
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

  // notificacion_enviada: true cuando ya se envió correo a suscritos
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
    collection: 'noticias',
    timestamps: {
      createdAt: 'created_at', // Para la creación en MongoDB
      updatedAt: 'modified_at' // Y este para cada actualización
    }
  }
)

// Atributos estándar y operaciones al guardar/actualizar
noticiaSchema.plugin(audit);

module.exports = mongoose.model('Noticia', noticiaSchema);
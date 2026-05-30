/* Modelo para el esquema de Reporte */
const mongoose = require('mongoose');
const audit = require('../middleware/plugginAudit');

const reporteSchema = new mongoose.Schema({

  // autor_id: Cuenta que reportó el contenido
  autor_id: {
    // Usuario — usuario, voluntario, centro_acopio, prestador o admin
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },

  // tema: Motivo del reporte
  tema: {
    type: String,
    enum: ['informacion_erronea', 'lenguaje_inapropiado', 'spam', 'acoso', 'otro'],
    required: true,
    default: 'otro'
  },

  // contenido: Mensaje/contenido del reporte
  contenido: {
    type: String,
    trim: true,
    maxlength: 500,
    required: true
  },

  // contexto_tipo: Tipo de contenido reportado
  contexto_tipo: {
    type: String,
    // ATENCIÓN: Los enum son los nombres de la colección, inician con mayúscula y están en singular
    enum: ['Usuario', 'Contacto', 'Comentario', 'Centro', 'Evento', 'Noticia', 'Valoracion'],
    required: true
  },

  // contexto_id: ID del contenido erróneo o inapropiado
  contexto_id: {
    // Referencia polimórfica — Usuario, Contacto, Comentario, Centro, Evento, Noticia o Valoracion según contexto_tipo
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'contexto_tipo',
    required: true
  },

  // estado: Estado de resolución del reporte
  estado: {
    type: String,
    enum: ['pendiente', 'moderado', 'rechazado'],
    required: true,
    default: 'pendiente'
  },

  // resuelto_por: Cuenta del centro, prestador o admin que resolvió
  // -> Sólo presente si estado !== 'pendiente'
  resuelto_por: {
    // Usuario — Administrador o moderador del contenido
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },

  // fecha_revision: Cuándo se revisó el reporte
  // -> Sólo presente si estado !== 'pendiente'
  fecha_revision: {
    type: Date
  },

  // notas: Comentarios extra del revisor
  notas: {
    type: String,
    maxlength: 500,
    trim: true
  }

},
  {
    collection: 'reportes',
    timestamps: {
      createdAt: 'created_at', // Para la creación en MongoDB
      updatedAt: 'modified_at' // Y este para cada actualización
    }
  }
)

// Atributos estándar y operaciones al guardar/actualizar
reporteSchema.plugin(audit);

// Índice simple para consultar todos los reportes de un contexto sin escanear la colección entera
reporteSchema.index({ contexto_id: 1 });

// Índice único compuesto: Un usuario solo puede valorar un reportar un contexto una vez; no se sobreescribe, aparece un mensaje de 'ya reportado' o 'en revisión'
reporteSchema.index({ contexto_id: 1, autor_id: 1 }, { unique: true })

module.exports = mongoose.model('Reporte', reporteSchema);
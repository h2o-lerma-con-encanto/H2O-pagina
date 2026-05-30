/* Modelo para el esquema de Valoracion */
const mongoose = require('mongoose');
const audit = require('../middleware/plugginAudit');

const valoracionSchema = new mongoose.Schema({

  // centro_acopio_id: Centro de acopio que se está valorando
  centro_acopio_id: {
    // Centro — Centro de Acopio del contacto
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Centro',
    required: true
  },

  // usuario_id: Usuario que escribe la valoración
  usuario_id: {
    // Usuario — Autor de la valoració y reseña
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },

  // estrellas: Calificación numérica del centro del 1 al 5
  estrellas: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },

  // categorias: Aspectos positivos del centro seleccionados por el usuario
  categorias: {
    type: [String],
    enum: ['estacionamiento_disponible','accesibilidad','buena_atencion','limpieza',
          'buena_organizacion','ubicacion_conveniente','horarios_amplios'],
    required: true,
    default: []
  },

  // mensaje: Comentario escrito del usuario sobre el centro — embebido aquí, NO usa la colección comentarios
  mensaje: {
    type: String,
    trim: true,
    minlength: 15,
    maxlength: 500
  },

  // respuesta: Respuesta del centro o admin a esta valoración
    respuesta: {
    type: String,
    trim: true,
    minlength: 20,
    maxlength: 500
  },

  // encargado_id: Usuario (centro_acopio o admin) que redactó la respuesta
  // -> Obligatorio si respuesta tiene contenido
  encargado_id: {
    // Usuario — admin o centro de acopio
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
},
  {
    collection: 'valoraciones',
    timestamps: {
      createdAt: 'created_at', // Para la creación en MongoDB
      updatedAt: 'modified_at' // Y este para cada actualización
    }
  }
)

// Atributos estándar y operaciones al guardar/actualizar
valoracionSchema.plugin(audit);

// Índice único compuesto: Un usuario solo puede valorar un centro una vez; al revalorar se sobreescribe
valoracionSchema.index({ centro_acopio_id: 1, usuario_id: 1 }, { unique: true })

module.exports = mongoose.model('Valoracion', valoracionSchema);
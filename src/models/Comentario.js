/* Modelo para el esquema de Comentario */
const mongoose = require('mongoose');
const audit = require('../middleware/plugginAudit');

const comentarioSchema = new mongoose.Schema({

  // autor_id: Cuenta que escribió el comentario
  autor_id: {
    // Usuario — usuario, voluntario, centro_acopio, prestador o admin
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },

  // contenido: Texto del comentario
  contenido: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 500,
    required: true
  },

  // contexto_tipo: Tipo de entidad a la que pertenece el comentario
  contexto_tipo: {
    type: String,
    // ATENCIÓN: Los enum son los nombres de la colección, inician con mayúscula y están en singular
    enum: ['Noticia', 'Evento'],
    required: true
  },

  // contexto_id: ID del documento al que pertenece el comentario
  contexto_id: {
    // Referencia polimórfica — Noticia o Evento según contexto_tipo
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'contexto_tipo',
    required: true
  },

  // respuesta_a_id: ID del comentario padre
  // -> Sólo presente solo cuando este comentario es una respuesta anidada
  respuesta_a_id: {
    //Comentario —> comentario al que se responde
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comentario'
  },

  // is_oculto: Indica si el comentario fue moderado y está oculto (soft delete; no se borra físicamente)
  is_oculto: {
    type: Boolean,
    required: true,
    default: false
  },

  // moderado_por: Usuario que aplicó la moderación
  // -> Obligatorio si oculto es true
  moderado_por: {
    // Usuario — Administrador o moderador del comentario
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },

  // fecha_moderacion: Fecha y hora en que se moderó el comentario
  // -> Obligatorio si oculto es true
  fecha_moderacion: {
    type: Date
  }

},
  {
    collection: 'comentarios',
    timestamps: {
      createdAt: 'created_at', // Para la creación en MongoDB
      updatedAt: 'modified_at' // Y este para cada actualización
    }
  }
)

// Atributos estándar y operaciones al guardar/actualizar
comentarioSchema.plugin(audit);

// Índice simple para consultar todos los comeentarios de un contexto sin escanear la colección entera
comentarioSchema.index({ contexto_id: 1 });

// Índice simple para consultar todas las respuestas de un comentario sin escanear la colección entera
comentarioSchema.index({ respuesta_a_id: 1 });

module.exports = mongoose.model('Comentario', comentarioSchema);
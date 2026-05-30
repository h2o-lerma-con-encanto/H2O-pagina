/* Modelo para el esquema de Formulario_respuesta */
const mongoose = require('mongoose');
const audit = require('../middleware/plugginAudit');

const formulario_respuestaSchema = new mongoose.Schema({

  // nombre: Nombre del autor
  nombre: {
    type: String,
    trim: true,
    required: true
  },

  // email: Correo de contacto para responder
  email: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    trim: true,
    lowercase: true,
    minlength: 6,
    maxlength: 100,
    required: true
   },

  // telefono: Teléfono opcional
  telefono: {
    type: String,
    trim: true,
    maxlength: 10,
  },

  // tema: Tipo de formulario
  tema: {
    type: String,
    enum: ['general', 'industria', 'voluntariado_transportista', 'voluntariado_redes', 'voluntariado_platicas', 'centro_acopio', 'servicio_social', 'donaciones', 'otro'],
    required: true,
    default: 'general'
  },

  // contenido: Mensaje completo del formulario de contacto general
  // -> Obligatorio si tema es 'general'
  contenido: {
    type: String,
    trim: true,
    maxlenght: 500,
  },

  // respuestas: Contenido del formulario estructurado
  // -> Obligatorio si tema !== 'general'
  /* POR DEFINIR: Información adicional solicitada */
  respuestas: {
    // Object (JSON), Validación a nivel de aplicación
    type: mongoose.Schema.Types.Mixed
  },

  // usuario_id: Cuenta del autor de la solicitud
  // -> Obligatorio si tema !== 'general'
 usuario_id: {
    // Usuario — al aprobarse cambia el rol del usuario
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },

  // estado: Estado de revisión de la solicitud
  estado: {
    type: String,
    enum: ['pendiente','aprobada','rechazada'],
    required: true,
    default: 'pendiente'
  },

  // revisado_por: Admin que respondió la solicitud
  // -> Sólo presente si estado !== 'pendiente'
  revisado_por: {
      // Usuario — Administrador o validador del formulario
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
    },

  // fecha_revision: Cuándo se revisó la solicitud
  // -> Sólo presente si estado !== 'pendiente'
  fecha_revision: {
    type: Date
  },

  // notas: Notas del admin sobre la solicitud
  notas: {
    type: String,
    maxlength: 500,
    trim: true
  }

},
  {
    collection: 'formularios_respuestas',
    timestamps: {
      createdAt: 'created_at', // Para la creación en MongoDB
      updatedAt: 'modified_at' // Y este para cada actualización
    }
  }
)

// Atributos estándar y operaciones al guardar/actualizar
formulario_respuestaSchema.plugin(audit);

// Índice simple para consultar todas las respuestas de un usuario sin escanear la colección entera
formulario_respuestaSchema.index({ usuario_id: 1 });

// Índice simple para consultar todas los formularios generales de un correo anónimo sin escanear la colección entera
formulario_respuestaSchema.index({ email: 1 }, {
  partialFilterExpression: { tema: 'general' }
});

// Índice único compuesto: Un usuario solo puede tener una respuesta de formulario por tipo, excluyendo el general, a menos que haya sido rechazada
formulario_respuestaSchema.index({ usuario_id: 1, tema: 1, },
  {
    unique: true, partialFilterExpression: {
      tema: {
        $in:
          ['industria', 'voluntariado_transportista', 'voluntariado_redes',
            'voluntariado_platicas', 'centro_acopio', 'servicio_social', 'donaciones']
      },
      estado: { $ne: 'rechazada' }
    }
  });

module.exports = mongoose.model('Formulario_respuesta', formulario_respuestaSchema);
/* Modelo para el esquema de Asistencia */
const mongoose = require('mongoose');
const audit = require('../middleware/plugginAudit');

const asistenciaSchema = new mongoose.Schema({

  // usuario_id: Usuario inscrito al evento
  usuario_id: {
    // Usuario — Cuenta del usuario registrado
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },

  // evento_id: Evento al que se inscribió el usuario
  evento_id: {
    // Evento — Evento al que se inscribió el usuario
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evento',
    required: true
  },

  // asistio: Indica si el usuario efectivamente asistió; lo marca el organizador después del evento para otorgar puntos
  // -> Obligatorio después del evento
  asistio: {
    type: Boolean
  },

  // validada_por: Cuenta del centro o encargado que validó la asistencia
  // -> Sólo presente si asistio es true
  validada_por: {
    // Usuario — Administrador o moderador de la asistencia
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },

  // fecha_validacion: Cuándo se validó la asistencia
  // -> Sólo presente si asistio es true
  fecha_validacion: {
    type: Date
  },

  // notas: Notas o motivo de rechazo
  notas: {
    type: String,
    maxlength: 500,
    trim: true
  }
},
  {
    collection: 'asistencias',
    timestamps: {
      createdAt: 'created_at', // Para la creación en MongoDB
      updatedAt: 'modified_at' // Y este para cada actualización
    }
  }
)

// Atributos estándar y operaciones al guardar/actualizar
asistenciaSchema.plugin(audit);

// Índice único compuesto: Un usuario solo puede tener una inscripción por evento
asistenciaSchema.index({ evento_id: 1, usuario_id: 1 }, { unique: true })

module.exports = mongoose.model('Asistencia', asistenciaSchema);
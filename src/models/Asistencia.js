/* Modelo para el esquema de Asistencia */
const mongoose = require('mongoose');
const audit = require('../middleware/plugginAudit');

const asistenciaSchema = new mongoose.Schema({
},
  {
    collection: 'asistencias',
    timestamps: {
      createdAt: 'created_at', // Para la creación en MongoDB
      updatedAt: 'modified_at' // Y este para cada actualización
    }
  }
)

asistenciaSchema.plugin(plugginAudit);
module.exports = mongoose.model('Asistencia', asistenciaSchema);
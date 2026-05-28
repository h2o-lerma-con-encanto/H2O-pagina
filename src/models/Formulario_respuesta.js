  /* Modelo para el esquema de Formulario_respuesta */
  const mongoose = require('mongoose');
  const auditUser = require('../middleware/plugginAuditUser');

  const formulario_respuestaSchema = new mongoose.Schema({
  },
    {
      collection: 'formularios_respuestas',
      timestamps: {
        createdAt: 'created_at', // Para la creación en MongoDB
        updatedAt: 'modified_at' // Y este para cada actualización
      }
    }
  )

  formulario_respuestaSchema.plugin(auditUser);
  module.exports = mongoose.model('Formulario_respuesta', formulario_respuestaSchema);
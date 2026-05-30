  /* Modelo para el esquema de Evento */
  const mongoose = require('mongoose');
  const auditUser = require('../middleware/plugginAuditUser');

  const eventoSchema = new mongoose.Schema({
  },
    {
      collection: 'eventos',
      timestamps: {
        createdAt: 'created_at', // Para la creación en MongoDB
        updatedAt: 'modified_at' // Y este para cada actualización
      }
    }
  )

  eventoSchema.plugin(auditUser);
  module.exports = mongoose.model('Evento', eventoSchema);
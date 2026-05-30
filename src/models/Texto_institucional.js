  /* Modelo para el esquema de Texto_institucional */
  const mongoose = require('mongoose');
  const auditUser = require('../middleware/plugginAuditUser');

  const texto_institucionalSchema = new mongoose.Schema({
  },
    {
      collection: 'textos_institucionales',
      timestamps: {
        createdAt: 'created_at', // Para la creación en MongoDB
        updatedAt: 'modified_at' // Y este para cada actualización
      }
    }
  )

  texto_institucionalSchema.plugin(auditUser);
  module.exports = mongoose.model('Texto_institucional', texto_institucionalSchema);
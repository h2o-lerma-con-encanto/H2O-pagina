  /* Modelo para el esquema de Nombre */
  const mongoose = require('mongoose');
  const auditUser = require('../middleware/plugginAuditUser');

  const nombreSchema = new mongoose.Schema({
  },
    {
      collection: 'nombrePLURAL',
      timestamps: {
        createdAt: 'created_at', // Para la creación en MongoDB
        updatedAt: 'modified_at' // Y este para cada actualización
      }
    }
  )

  nombreSchema.plugin(auditUser);
  module.exports = mongoose.model('Nombre', nombreSchema);
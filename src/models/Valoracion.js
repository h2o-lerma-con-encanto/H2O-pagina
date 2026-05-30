  /* Modelo para el esquema de Valoracion */
  const mongoose = require('mongoose');
  const auditUser = require('../middleware/plugginAuditUser');

  const valoracionSchema = new mongoose.Schema({
  },
    {
      collection: 'valoraciones',
      timestamps: {
        createdAt: 'created_at', // Para la creación en MongoDB
        updatedAt: 'modified_at' // Y este para cada actualización
      }
    }
  )

  valoracionSchema.plugin(auditUser);
  module.exports = mongoose.model('Valoracion', valoracionSchema);
  /* Modelo para el esquema de Comentario */
  const mongoose = require('mongoose');
  const auditUser = require('../middleware/plugginAuditUser');

  const comentarioSchema = new mongoose.Schema({
  },
    {
      collection: 'comentarios',
      timestamps: {
        createdAt: 'created_at', // Para la creación en MongoDB
        updatedAt: 'modified_at' // Y este para cada actualización
      }
    }
  )

  comentarioSchema.plugin(auditUser);
  module.exports = mongoose.model('Comentario', comentarioSchema);
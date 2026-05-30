  /* Modelo para el esquema de Noticia */
  const mongoose = require('mongoose');
  const auditUser = require('../middleware/plugginAuditUser');

  const noticiaSchema = new mongoose.Schema({
  },
    {
      collection: 'noticiaPLURAL',
      timestamps: {
        createdAt: 'created_at', // Para la creación en MongoDB
        updatedAt: 'modified_at' // Y este para cada actualización
      }
    }
  )

  noticiaSchema.plugin(auditUser);
  module.exports = mongoose.model('Noticia', noticiaSchema);
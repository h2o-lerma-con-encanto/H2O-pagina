  /* Modelo para el esquema de Entrega */
  const mongoose = require('mongoose');
  const auditUser = require('../middleware/plugginAuditUser');

  const entregaSchema = new mongoose.Schema({
  },
    {
      collection: 'entregas',
      timestamps: {
        createdAt: 'created_at', // Para la creación en MongoDB
        updatedAt: 'modified_at' // Y este para cada actualización
      }
    }
  )

  entregaSchema.plugin(auditUser);
  module.exports = mongoose.model('Entrega', entregaSchema);
  /* Modelo para el esquema de Usuario */
  const mongoose = require('mongoose');
  const auditUser = require('../middleware/plugginAuditUser');

  const usuarioSchema = new mongoose.Schema({
  },
    {
      collection: 'usuarios',
      timestamps: {
        createdAt: 'created_at', // Para la creación en MongoDB
        updatedAt: 'modified_at' // Y este para cada actualización
      }
    }
  )

  usuarioSchema.plugin(auditUser);
  module.exports = mongoose.model('Usuario', usuarioSchema);
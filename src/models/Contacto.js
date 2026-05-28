  /* Modelo para el esquema de Contacto */
  const mongoose = require('mongoose');
  const auditUser = require('../middleware/plugginAuditUser');

  const contactoSchema = new mongoose.Schema({
  },
    {
      collection: 'contactos',
      timestamps: {
        createdAt: 'created_at', // Para la creación en MongoDB
        updatedAt: 'modified_at' // Y este para cada actualización
      }
    }
  )

  contactoSchema.plugin(auditUser);
  module.exports = mongoose.model('Contacto', contactoSchema);
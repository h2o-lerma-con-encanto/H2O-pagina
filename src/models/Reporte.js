  /* Modelo para el esquema de Reporte */
  const mongoose = require('mongoose');
  const auditUser = require('../middleware/plugginAuditUser');

  const reporteSchema = new mongoose.Schema({
  },
    {
      collection: 'reportes',
      timestamps: {
        createdAt: 'created_at', // Para la creación en MongoDB
        updatedAt: 'modified_at' // Y este para cada actualización
      }
    }
  )

  reporteSchema.plugin(auditUser);
  module.exports = mongoose.model('Reporte', reporteSchema);
/* Modelo para el esquema de Centro */
const mongoose = require('mongoose');
const auditUser = require('../middleware/plugginAuditUser');

const centroSchema = new mongoose.Schema({
},
  {
    collection: 'centros',
    timestamps: {
      createdAt: 'created_at', // Para la creación en MongoDB
      updatedAt: 'modified_at' // Y este para cada actualización
    }
  }
)

centroSchema.plugin(auditUser);
module.exports = mongoose.model('Centro', centroSchema);
/* Modelo para el esquema de nombre */
const mongoose = require('mongoose');

const nombreSchema = new mongoose.Schema({
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true 
  },
  modified_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: false
  }
},
  {
    collection: 'nombre',
    timestamps: {
      createdAt: 'created_at', // Mongoose usará este nombre para la creación
      updatedAt: 'modified_at' // Y este para cada actualización
    }
  }
)

nombreSchema.plugin(audit);
module.exports = mongoose.model('Nombre', nombreSchema);
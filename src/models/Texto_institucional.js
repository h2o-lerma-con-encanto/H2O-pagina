/* Modelo para el esquema de Texto_institucional */
const mongoose = require('mongoose');
const audit = require('../middleware/plugginAudit');

// ATENCIÓN: El único valor que el usuario administrador puede modificar es el del contenido,
// el título se asigna según la clave y no puede modificarse desde la página.

const texto_institucionalSchema = new mongoose.Schema({

  // clave: Identificador único del texto; el frontend lo usa para solicitar un texto específico por nombre
  /* POR DEFINIR: Claves adicionales */
  clave: {
    type: String,
    enum: ['mision', 'vision', 'historia', 'etapas_pozos', 'etapas_plantas', 'etapas_centros', 'sustento_cientifico', 'nom_001'],
    required: true,
    unique: true
  },

  // titulo: Título visible del texto en el sitio
  titulo: {
    type: String,
    maxlength: 200,
    trim: true,
    required: true
  },

  // contenido: Cuerpo del texto institucional en formato rich text / HTML
  contenido: {
    type: String,
    trim: true,
    required: true
  },

},
  {
    collection: 'textos_institucionales',
    timestamps: {
      createdAt: 'created_at', // Para la creación en MongoDB
      updatedAt: 'modified_at' // Y este para cada actualización
    }
  }
)

// Atributos estándar y operaciones al guardar/actualizar
texto_institucionalSchema.plugin(audit);

module.exports = mongoose.model('Texto_institucional', texto_institucionalSchema);
/* Modelo para el esquema de Centro */
const mongoose = require('mongoose');
const audit = require('../middleware/plugginAudit');

const centroSchema = new mongoose.Schema({

  // nombre: Nombre del Centro de Acopio
  nombre: {
    type: String,
    minlength: 3,
    maxlength: 150,
    trim: true,
    required: true,
    unique: true
  },

  // is_activo: Soft delete: 'false' oculta el centro
  is_activo: {
    type: Boolean,
    required: true,
    default: true
  },

  // foto_url: URL de Cloudinary; una sola foto por centro
  foto_url: {
    type: String,
    // Regex — Enlace válido de Cloudinary
    match: [/^https:\/\/res\.cloudinary\.com\/.+\/.+\/.+\/.+\/.+\/.+\..{1,4}/,
           'La URL debe ser un link de Cloudinary'],
    trim: true,
    required: true,
    unique: true,
    sparse: true
  },

  // capacidad_kg: Capacidad máxima del centro en kilogramos
  capacidad_kg: {
    type: Number,
    required: true
  },

  // costales_actuales_kg: Cantidad almacenada actualmente en kilogramos
  costales_actuales_kg: {
    type: Number,
    required: true,
    default: 0
  },

  // entrega_reciente: Fecha de la entrega más reciente del cascarón a H2O
  entrega_reciente: {
    type: Date
  },

  // anotaciones: Información relevante para los administradores
  anotaciones: {
    type: String,
    maxlength: 500,
    trim: true
  },

  // redes_sociales: Facebook, Instagram, TikTok, Página Web u otros
  redes_sociales: {
    facebook:   { type: String },
    instagram:  { type: String },
    tiktok:     { type: String },
    pagina_web: { type: String },
    otro:       { type: String }
  },

  // = Subdocumento embebido: direccion
  // direccion: Dirección física del centro
  direccion: {

    // tipo_calle: Tipo de vialidad
    tipo_calle: {
      type: String,
      enum: ['avenida', 'boulevard', 'calle', 'callejon', 'calzada', 'camino', 'carretera', 'cerrada', 'eje_vial', 'privada', 'prolongacion', 'otro'],
      required: true,
      default: 'calle'
    },

    // calle: Nombre de la calle (sin el tipo)
    calle: {
      type: String,
      trim: true,
      lowercase: true,
      required: true
    },

    // numero_exterior: Número exterior; String por posibles letras (ej. 12-A)
    numero_exterior: {
      type: String,
      required: true
    },

    // numero_interior: Número interior del establecimiento
    numero_interior: {
      type: String
    },

    // tipo_asentamiento: Tipo de asentamiento urbano
    tipo_asentamiento: {
      type: String,
      enum: ['barrio', 'colonia', 'fraccionamiento', 'pueblo', 'rancho', 'residencial', 'unidad_habitacional', 'zona_industrial', 'otro'],
      required: true,
      default: 'colonia'
    },

    // nombre_asentamiento: Nombre del asentamiento (colonia, barrio, etc.)
    nombre_asentamiento: {
      type: String,
      trim: true,
      lowercase: true,
      required: true
    },

    // municipio: Municipio o alcaldía
    municipio: {
      type: String,
      trim: true,
      lowercase: true,
      required: true
    },

    // estado: Estado de la república mexicana
    estado: {
      type: String,
      enum: ['aguascalientes', 'baja_california', 'baja_california_sur', 'campeche', 'chiapas',
            'chihuahua', 'coahuila', 'colima', 'ciudad_de_mexico', 'durango', 'estado_de_mexico',
            'guanajuato', 'guerrero', 'hidalgo', 'jalisco', 'michoacan', 'morelos', 'nayarit',
            'nuevo_leon', 'oaxaca', 'puebla', 'queretaro', 'quintana_roo', 'san_luis_potosi',
            'sinaloa', 'sonora', 'tabasco', 'tamaulipas', 'tlaxcala', 'veracruz', 'yucatan',
            'zacatecas'],
      required: true,
      default: 'estado_de_mexico'
    },

    // codigo_postal: CP mexicano (5 dígitos)
    codigo_postal: {
      type: String,
      // Regex — Código postal de 5 digitos
      match: [/^\d{5}$/, 'El código postal mexicano se conforma de 5 dígitos.'],
      trim: true,
      required: true
    },

    // url_google_maps: Enlace con la ubicación en Google Maps
    url_google_maps: {
      type: String,
      // Regex — Enlace de google maps
      match: [/^https:\/\/maps\.app\.goo\.gl\/.{17}/, 
             'La URL debe ser un link de Google Maps'],
      trim: true,
      required: true,
      unique: true,
      sparse: true
    },

    // referencias: Notas adicionales de la dirección
    referencias: {
      type: String,
      maxlength: 500,
      trim: true
    }
  },

  // = Subdocumento embebido array: horarios
  // horarios: Horario de disponibilidad; un objeto por rango; el día puede repetirse si el horario es partido
  horarios: [
    {
      // dia: Día de la semana
      dia: {
        type: String,
        enum: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'],
        required: true
      },

      // hora_inicio: Hora de apertura en formato 24h (HH:MM)
      hora_inicio: {
        type: String,
        required: true
      },

      // hora_fin: Hora de cierre en formato 24h (HH:MM)
      hora_fin: {
        type: String,
        required: true
      },

      // abierto: false marca el día como cerrado
      abierto: {
        type: Boolean,
        required: true,
        default: true
      }
    }
  ]

},
  {
    collection: 'centros',
    timestamps: {
      createdAt: 'created_at', // Para la creación en MongoDB
      updatedAt: 'modified_at' // Y este para cada actualización
    }
  }
)

// Atributos estándar y operaciones al guardar/actualizar
centroSchema.plugin(audit);

module.exports = mongoose.model('Centro', centroSchema);
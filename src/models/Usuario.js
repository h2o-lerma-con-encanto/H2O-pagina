/* Modelo para el esquema de Usuario */
const mongoose = require('mongoose');
const auditUser = require('../middleware/plugginAuditUser');

const usuarioSchema = new mongoose.Schema({

  // email: Correo electrónico, usado para iniciar sesión
  email: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    trim: true,
    lowercase: true,
    minlength: 6,
    maxlength: 100,
    required: true,
    unique: true
  },

  // user: Handle público del usuario (sin espacios ni caracteres especiales)
  user: {
    type: String,
    match: [/^[a-zA-Z0-9|_|\-]+$/,
      'Sólo se aceptan números, letras y guiones.'],
    trim: true,
    minlength: 1,
    maxlength: 50,
    required: true,
    unique: true
  },

  // password: Contraseña hasheada con bcrypt — nunca se expone en respuestas de la API
  password: {
    type: String,
    // Regex — 1 mayúscula, 1 minúscula, 1 número y un símbolo
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      'Asegurate de incluir un símbolo, un número, letras mayúsculas y minúsculas.'],
    minlength: 8,
    maxlength: 100,
    required: true,
    select: false
  },

  // nombre: Nombre visible del usuario en la plataforma
  nombre: {
    type: String,
    trim: true,
    minlength: 10,
    maxlength: 150,
    required: true
  },

  // fecha_nacimiento: Fecha de nacimiento del usuario, DD/MM/AAAA
  // POR DEFINIR: Si existe algun requerimiento mínimo de edad
  fecha_nacimiento: {
    type: Date,
    required: true
  },

  // rol: Nivel de acceso del usuario en el sistema
  rol: {
    type: String,
    enum: ['usuario', 'voluntario', 'centro_acopio', 'prestador_servicio_social', 'administrador'],
    required: true,
    default: 'usuario'
  },

  // voluntariado: Tipo de voluntariado
  // -> Obligatorio si rol es 'voluntario'
  /* POR DEFINIR: Categorías adicionales */
  voluntariado: {
    type: String,
    enum: ['transportista', 'redes_sociales', 'ponente', 'otro'],
  },

  // foto_url: URL de Cloudinary; una sola foto por usuario. Máximo 2 MB en subida
  foto_url: {
    type: String,
    // Regex — Enlace válido de Cloudinary
    match: [/^https:\/\/res\.cloudinary\.com\/.+\/.+\/.+\/.+\/.+\/.+\..{1,4}/,
      'La URL debe ser un link de Cloudinary'],
    trim: true,
    unique: true,
    sparse: true
  },
  // puntos: Puntos acumulados por gamificación
  puntos: {
    type: Number,
    min: 0,
    required: true,
    default: 0
  },

  // nivel: Nivel según puntos
  /* POR DEFINIR: Nivel mínimo, nivel máximo, etc. */
  nivel: {
    type: Number,
    min: 0,
    max: 99,
    required: true,
    default: 1
  },

  // insignias: Lista de claves de insignias obtenidas — POR DEFINIR con H2O
  /* POR DEFINIR: Nombres, nivel necesario, etc. */
  insignias: {
    type: [String],
    /* enum: [], */   
    required: true,
    default: []
  },

  // notificaciones_activas: Si recibe correos por noticias y eventos; editable desde el perfil
  notificaciones_activas: {
    type: Boolean,
    required: true,
    default: true
  },

  // token_notificaciones: Token para desuscribirse de notificaciones sin iniciar sesión
  token_notificaciones: {
    type: String,
    required: true,
    unique: true
  },

 // token_verificacion: Token para verificar correo
  token_verificacion: {
    type: String,
    unique: true,
    select: false
  },

  // token_verificacion_expira: Fecha de expiración del token para verificar correo (token_verificacion)
  token_verificacion_expira: {
    type: Date  
  },

 // token_reset_password: Token para resetear contraseña (recuperación de cuenta)
  token_reset_password: {
    type: String,
    unique: true,
    select: false
  },

  // token_reset_expira: Fecha de expiración del token para resetear contraseña (token_reset_password)
  token_reset_expira: {
    type: Date  
  },

  // last_login: Fecha y hora del último inicio de sesión
  last_login: {
    type: Date
  },

  // is_activo: Soft delete; false desactiva la cuenta. El contenido queda visible pero anónimo
  is_activo: {
    type: Boolean,
    required: true,
    default: true
  },

  // correo_verificado: Necesario para validar entregas y recibir notificaciones
  correo_verificado: {
    type: Boolean,
    required: true,
    default: false
  },

  // contacto_id: Si la cuenta está vinculada a un contacto de centro
  // -> Sólo aplica si rol es 'centro_acopio' o voluntario con eventos
  contacto_id: {
    // Contacto — La cuenta de usuario se vincula a un contacto
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contacto',
    unique: true,
    sparse: true
  },

  // comentarios_moderados: Contador de comentarios ocultados al usuario
  comentarios_moderados: {
    type: Number,
    min: 0,
    required: true,
    default: 0
  },

  // reportes_recibidos: Contador de reportes contra el usuario
  reportes_recibidos: {
    type: Number,
    min: 0,
    required: true,
    default: 0
  }
},
  {
    collection: 'usuarios',
    timestamps: {
      createdAt: 'created_at', // Para la creación en MongoDB
      updatedAt: 'modified_at' // Y este para cada actualización
    }
  }
)

// Atributos estándar y operaciones al guardar/actualizar
usuarioSchema.plugin(auditUser);

module.exports = mongoose.model('Usuario', usuarioSchema);
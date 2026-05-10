/* Actualización de los campos de autor automáticamente */
// ATENCIÓN: Sólo los Usuarios utilizan este pluggin.

const mongoose = require('mongoose');
module.exports = function auditUser(schema) {
  // Añade los campos estándar
  schema.add({
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: false
    },
    modified_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: false
    }
  });

  // Para actualizar automáticamente los autores
  // ATENCIÓN: Esto son sólo funciones, la variable ._userContext
  // ddebe definirse ANTES de usar save, update, etc.

  // Al crear o guardar .save() y .create()
  schema.pre('save', function (next) {

    // ATENCIÓN: Al crear una cuenta desde el anonimato, no podemos solicitar un usuario,
    // no se hace la validación negativa. SIN EMBARGO, al crear o modificar con rol ADMIN
    // DEBE enviarse el usuario autor para preservar al integridad de los datos.

    if (this._userContext) {
      if (this.isNew) {
        this.created_by = this._userContext;
      }
      this.modified_by = this._userContext;

    }
    next();

  });

  // Para las actualizaciones
  const accionesModificacion = [
    'updateOne',
    'updateMany',
    'findOneAndUpdate',
    'findOneAndReplace',
    'replaceOne'
  ];

  schema.pre(accionesModificacion, function (next) {
    const data = this.getUpdate();

    // En los queries, buscamos el contexto
    const userId = this.options._userContext;

    if (!userId) {
      return next(new Error('Debes proveer al usuario autor para actualizar.'));
    }

    // Aplicamos modificador en la actualización
    // Modificación parcial:
    if (data.$set) {
      data.$set.modified_by = userId;
      // Modificación entera
    } else {
      data.modified_by = userId;
    }

    next();
  });

};
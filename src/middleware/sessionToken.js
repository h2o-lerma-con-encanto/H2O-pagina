const jwt = require('jsonwebtoken');

// Helper: generar token con id, user y rol del Usuario
const generateToken = (usuario) => {
  const payload = {
    id: usuario._id,
    user: usuario.user,
    role: usuario.rol
  };
  const expiresIn = process.env.TOKEN_EXPIRES_IN;
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};
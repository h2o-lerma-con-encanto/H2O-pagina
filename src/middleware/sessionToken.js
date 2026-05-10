const jwt = require('jsonwebtoken');

// Helper: generar token con id, nombre y rol del Usuario
const generateToken = (user) => {
  const payload = {
    id: user._id,
    name: user.nombre,
    role: user.rol
  };
  const expiresIn = process.env.TOKEN_EXPIRES_IN;
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};
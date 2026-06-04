const jwt = require('jsonwebtoken');

// Helper: generar token con id, user y rol del Usuario
const generateToken = (usuario) => {
  const payload = {
    id: user._id,
    user: user.user,
    role: user.rol
  };
  const expiresIn = process.env.TOKEN_EXPIRES_IN;
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};
import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const verifyTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(HttpStatus.UNAUTHORIZED);

  const decodedToken = verifyToken(token);
  if (decodedToken) {
    req.user = decodedToken;
    next();
  } else {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token is invalid or expired' });
  }
};

export { generateToken, verifyToken, verifyTokenMiddleware };
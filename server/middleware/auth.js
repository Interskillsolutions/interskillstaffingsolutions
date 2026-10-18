import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Verify JWT token from Authorization header
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'interskill_secret_key_123'
      );

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'User belonging to this token no longer exists' });
      }

      if (!req.user.isActive) {
        return res.status(403).json({ message: 'Account is deactivated. Contact an administrator.' });
      }

      return next();
    } catch (error) {
      console.error('JWT Auth Error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed or expired' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Role-based authorization guard
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden: User role '${req.user?.role}' is not authorized to access this resource`,
      });
    }
    next();
  };
};

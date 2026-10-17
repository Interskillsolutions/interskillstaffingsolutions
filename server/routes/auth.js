import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'interskill_secret_key_123', {
    expiresIn: '30d',
  });
};

// POST login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    // Seed default admin if no users exist in database yet
    if (!user && email === 'admin@interskillsolutions.com' && password === 'admin123') {
      user = await User.create({
        email: 'admin@interskillsolutions.com',
        password: 'admin123',
        role: 'admin',
      });
    }

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  const { name, username, password, role } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, username, password, role });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const { username, password, role } = req.body;

  // 1. HARDCODED BYPASS FOR TESTING (Works even if database is offline!)
  if (username === 'a@a' && password === 'a') {
    return res.json({
      _id: '000000000000000000000000', // Static demo ID
      name: 'Demo Account',
      username: 'a@a',
      role: role || 'farmer', // Uses whichever role was selected in the UI
      token: generateToken('000000000000000000000000')
    });
  }

  try {
    const user = await User.findOne({ username });
    if (user && (await user.comparePassword(password))) {
      
      // Update DB role for user if it's the specific a@a account in DB
      if (username === 'a@a' && role && user.role !== role) {
        user.role = role;
        await user.save();
      }

      res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import express from 'express';
import rateLimit from 'express-rate-limit';
import { registerUser, loginUser } from '../controllers/authController.js';
import { registerValidationRules, loginValidationRules, validateRequest } from '../middleware/validator.js';

const router = express.Router();

// 1. Setup specific rate limit for Auth (Prevents Brute Force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 1000, // 1000 requests per window (Disabled for development testing)
  message: { message: 'Too many attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// 2. Auth Routes
router.post(
  '/register', 
  authLimiter, 
  registerValidationRules, 
  validateRequest, 
  registerUser
);

router.post(
  '/login', 
  authLimiter, 
  loginValidationRules, 
  validateRequest, 
  loginUser
);

// Helpful: Logout (Frontend handles token removal)
router.get('/logout', (req, res) => {
  res.status(200).json({ message: 'Success: User is logged out locally.' });
});

export default router;

import { body, validationResult } from 'express-validator';

// 1. Validation Rules
export const registerValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['farmer', 'distributor', 'warehouse', 'certifier', 'retailer', 'customer']).withMessage('Invalid role'),
];

export const loginValidationRules = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// 2. Main Validation Logic
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ 
      errors: errors.array().map(err => ({ field: err.path, message: err.msg })) 
    });
  }
  next();
};

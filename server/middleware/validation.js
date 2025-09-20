const { body, validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// User registration validation rules
const validateRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('username')
    .isLength({ min: 3, max: 30 })
    .trim()
    .withMessage('Username must be between 3 and 30 characters'),
  body('role')
    .isIn(['organizer', 'volunteer'])
    .withMessage('Role must be either organizer or volunteer'),
  handleValidationErrors
];

// User login validation rules
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Task creation validation rules
const validateTaskCreation = [
  body('title')
    .isLength({ min: 1, max: 100 })
    .trim()
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .isLength({ min: 1, max: 1000 })
    .trim()
    .withMessage('Description must be between 1 and 1000 characters'),
  body('difficulty')
    .isIn(['easy', 'intermediate', 'difficult'])
    .withMessage('Difficulty must be easy, intermediate, or difficult'),
  body('deadline')
    .isISO8601()
    .toDate()
    .custom((value) => {
      if (value <= new Date()) {
        throw new Error('Deadline must be in the future');
      }
      return true;
    }),
  handleValidationErrors
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateTaskCreation,
  handleValidationErrors
};
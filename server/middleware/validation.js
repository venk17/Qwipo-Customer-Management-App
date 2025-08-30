import { body, param, query, validationResult } from 'express-validator';

export const validateCustomer = [
  body('first_name')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2-50 characters'),
  
  body('last_name')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2-50 characters'),
  
  body('phone_number')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\+?[\d\s\-\(\)]{10,15}$/)
    .withMessage('Please enter a valid phone number')
];

export const validateAddress = [
  body('address_details')
    .trim()
    .notEmpty()
    .withMessage('Address details are required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Address must be between 5-200 characters'),
  
  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2-50 characters'),
  
  body('state')
    .trim()
    .notEmpty()
    .withMessage('State is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('State must be between 2-50 characters'),
  
  body('pin_code')
    .trim()
    .notEmpty()
    .withMessage('PIN code is required')
    .matches(/^\d{6}$/)
    .withMessage('PIN code must be exactly 6 digits')
];

export const validateId = [
  param('id').isInt({ min: 1 }).withMessage('Invalid ID')
];

export const validatePagination = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1-100'),
  query('sortBy').optional().isIn(['first_name', 'last_name', 'phone_number', 'created_at']).withMessage('Invalid sort field'),
  query('sortOrder').optional().isIn(['ASC', 'DESC']).withMessage('Sort order must be ASC or DESC')
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    });
  }
  next();
};
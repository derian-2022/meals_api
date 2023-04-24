const { body, validationResult, } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty 🍗'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email 🍖'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty 🥩')
    .isLength({ min: 8 })
    .withMessage(
      'Password must be at least 8 characters long 🥠'
    ),
  body('role')
    .notEmpty()
    .withMessage('Role is normal, Or admin 🍖'),
  validFields,
];

exports.createRestaurantValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty 🥣'),
  body('address')
    .notEmpty()
    .withMessage('Address cannot be empty 🍊'),
  body('rating')
    .notEmpty()
    .withMessage('Rating cannot be empty 🍤')
    .isLength({ max: 1 })
    .withMessage(
        'Rating must be at least 1 characters long 🧉'
      )
    .matches(/^[1-5]$/)
    .withMessage('El campo debe contener un número del 1 al 5.🥑')
    .isInt()
    .withMessage(
      'The value must be number INTEGER 🥘'
    ),
  validFields,
];

exports.createMealValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty 🥩'),
  body('price')
    .notEmpty()
    .withMessage('Price cannot be empty 🍝')
    .isNumeric()
    .withMessage(
      'The value must be Number INTEGER 🧉'
    ),

  validFields,
];

const express = require('express');

const userControllers = require('../controllers/user.controller');

const validationMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.Middleware ');
const userMiddleware = require('../middlewares/users.middleware');

const router = express.Router();

router
  .post(
    '/signup',
    validationMiddleware.createUserValidation,
    userMiddleware.validIfExistEmail,
    userControllers.createUser
  )

  .post('/login', userControllers.loginUser);

router.use(authMiddleware.protect);

router.get(
  '/orders',
  userControllers.findAllOrders
);

router
  .route('/:id')
  .patch(
    userMiddleware.validIfExistUser,
    userControllers.updateUser
  )
  .delete(
    userMiddleware.validIfExistUser,
    userControllers.deleteUser
  );

router.get(
  '/orders/:id',
  userControllers.findOneOrderById
);

module.exports = router;

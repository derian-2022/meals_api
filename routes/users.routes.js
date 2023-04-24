const express = require('express');

const userControllers = require('../controllers/user.controller');
const validationMiddleware = require('../middlewares/validations.middleware');


const router = express.Router();

router
  .post('/signup', validationMiddleware.createUserValidation, userControllers.createUser)
  .post('/login', userControllers.loginUser);

router.get(
  '/orders',
  userControllers.findAllOrders
);

router
  .route('/:id')
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

router.get(
  '/orders/:id',
  userControllers.findOneOrderById
);

module.exports = router;

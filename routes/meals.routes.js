const express = require('express');

const mealsControllers = require('../controllers/meals.controller');
const validationMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.Middleware ');
const validIfMealExist = require('../middlewares/meals.Middleware');
const restaurantMiddleware = require('../middlewares/restaurants.Middleware');

const router = express.Router();

router.get('/', mealsControllers.findAllMeals);
router.get(
  '/:id',
  validIfMealExist.validIfMealExist,
  mealsControllers.findOneMeals
);

router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo("admin"))


router
  .route('/:id')
  .post(
    validationMiddleware.createMealValidation,
    restaurantMiddleware.validIfRestaurantExist,
    mealsControllers.createMeals
  )

  .all(validIfMealExist.validIfMealExist)
  .patch(mealsControllers.updateMeals)
  .delete(mealsControllers.deleteMeals);

module.exports = router;

const express = require('express');

const mealsControllers = require('../controllers/meals.controller');
const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router.get('/', mealsControllers.findAllMeals);

router
  .route('/:id')
  .post(
    validationMiddleware.createMealValidation,
    mealsControllers.createMeals
  )
  .get(mealsControllers.findOneMeals)
  .patch(mealsControllers.updateMeals)
  .delete(mealsControllers.deleteMeals);

module.exports = router;

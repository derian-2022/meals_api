const express = require('express');

const restaurantsControllers = require('../controllers/restaurants.controller');
const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router
  .route('/')
  .post(
    validationMiddleware.createRestaurantValidation,
    restaurantsControllers.createRestaurant
  )
  .get(restaurantsControllers.findAllRestaurant);

router
  .route('/:id')
  .get(restaurantsControllers.findOneRestaurant)
  .patch(restaurantsControllers.updateRestaurant)
  .delete(
    restaurantsControllers.deleteRestaurant
  );

router.post(
  '/reviews/:id',
  restaurantsControllers.createreview
);

router
  .route('/reviews/:restaurantId/:id')
  .patch(restaurantsControllers.updatereview)
  .delete(restaurantsControllers.deletereview);

module.exports = router;

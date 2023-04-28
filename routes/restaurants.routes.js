const express = require('express');

const restaurantsControllers = require('../controllers/restaurants.controller');

const validationMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.Middleware ');
const restaurantsMiddleware = require('../middlewares/restaurants.Middleware');
const reviewsMidlleware = require('../middlewares/reviews.Midlleware');

const router = express.Router();

router.get(
  '/',
  restaurantsControllers.findAllRestaurants
);
router.get(
  '/:id',
  restaurantsMiddleware.validReviewOfRestuarant,
  restaurantsControllers.findOneRestaurant
);

router.use(authMiddleware.protect);

router
  .route('/')
  .post(
    validationMiddleware.createRestaurantValidation,
    authMiddleware.restrictTo("admin"),
    restaurantsControllers.createRestaurant
  );

router
  .route('/:id')

  .patch(
    restaurantsMiddleware.validIfRestaurantExist,
    authMiddleware.restrictTo("admin"),
    restaurantsControllers.updateRestaurant
  )
  .delete(
    reviewsMidlleware.validIfExistReview,
    authMiddleware.restrictTo("admin"),
    restaurantsControllers.deleteRestaurant
  );

router.post(
  '/reviews/:id',
  restaurantsControllers.createReviewRestaurant
);

router
  .route('/review/:restaurantId/:id')
  .patch(
    reviewsMidlleware.validIfExistReview,
    restaurantsControllers.updateReviewRestaurant
  )
  .delete(
    reviewsMidlleware.validIfExistReview,
    restaurantsControllers.deleteReview
  );

module.exports = router;

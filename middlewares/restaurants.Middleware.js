const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Restaurants = require('../models/restaurants.models');
const Review = require('../models/reviews.models');


exports.validIfRestaurantExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurants.findOne({
    where: {
      id,
      status: 'active',
    },
    // attributes: {
    //   exclude: ['createdAt', 'updatedAt'],
    // },
  });

  if (!restaurant) next(new AppError('Restaurant was not found', 404));

  req.restaurant = restaurant;

  next();
});

exports.validReviewOfRestuarant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  

  const restaurant = await Restaurants.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [{
      model: Review,
    }]
  });

  if (!restaurant) next(new AppError('Restaurant was not found', 404));

  req.restaurant = restaurant;

  next();
});
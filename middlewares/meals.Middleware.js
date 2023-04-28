const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Meal = require('../models/meals.models');
const Restaurant = require('../models/restaurants.models');

exports.validIfMealExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: Restaurant,
        attributes: ['id', 'name', 'address', 'rating'],
      },
    ],
  });

  if (!meal) next(new AppError('Meal was not found', 404));

  req.meal = meal;

  next();
});
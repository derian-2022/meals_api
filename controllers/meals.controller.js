const Meals = require('../models/meals.models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Restaurants = require('../models/restaurants.models');


exports.createMeals = catchAsync(async (req, res, next) => {
    
    const { name, price } = req.body;
    const { restaurant } = req;
  console.log(restaurant)
    const meal = await Meals.create({
      name,
      restaurantId: restaurant.id,
      price,
    });

    res.status(201).json({
      status: 'success',
      message: 'The Meals has been created 🥣🍖🥩🍝',
      meal,
    });
  }
);

exports.findAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meals.findAll({
    where: {
      status: 'active',

      include: [{model: Restaurants}]
    },
    include: [
      {
        model: Restaurants,
        attributes: ['id', 'name', 'address', 'rating'],
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    message: 'All meals has been found 🥓🥩🥑',
    resutls: meals.length,
    meals,
  });
});


exports.findOneMeals = catchAsync(async (req, res, next) => {
    const { meal } = req;

    res.status(201).json({
      status: 'success',
      message: 'the meal was found 🍗🥘🥣',
      meal,
    });
  }
);

exports.updateMeals = catchAsync(async (req, res, next) => {
    const { meal } = req;
    const { name, price } = req.body;

    await meal.update({
        name: name,
        price,
    })

    res.status(200).json({
      status: 'success',
      message: 'Meal has been updated 🥩🍖🥐🥠',
    });
  }
);

exports.deleteMeals = catchAsync(async (req, res, next) => {
    const { meal } = req;

    await meal.update({
        status: 'disabled',
    })

    res.status(201).json({
      status: 'success',
      message: 'Meal has been deleted 😨🥩🥑',
    });
  }
);

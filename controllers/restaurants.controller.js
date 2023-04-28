const Restaurants = require('../models/restaurants.models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Review = require('../models/reviews.models');

exports.createRestaurant = catchAsync(
  async (req, res, next) => {
    const { name, address, rating } = req.body;

    const restaurant = await Restaurants.create({
      name,
      address,
      rating,
    });

    return res.status(201).json({
      status: 'success',
      message:
        'The Restaurant has been created 🍖🍤🍗🍝🥣',
      restaurant,
    });
  }
);

exports.findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurants.findAll({
    where: {
      status: 'active',

  
    },
    include: [{ model: Review, attributes: {
      exclude: ['createdAt', 'updatedAt'],
    }, }]
    
  });

  if (!restaurants) next(new AppError('Restaurants was not found 😓🍊🧉🍟', 404));

  return res.status(200).json({
    status: 'success',
    message: 'All restaurants has been found 🥣🍝🥘🥐🥠',
    results: restaurants.length,
    restaurants,
  });
});


exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  await restaurant.update({
    name: name.toLowerCase(),
    address: address.toLowerCase(),
  });

  return res.status(200).json({
    status: 'success',
    message: 'The Restaurant has been update 🥓🍗🥑🍖',
  });
});

exports.findOneRestaurant = catchAsync(
  async (req, res, next) => {
    const { restaurant } = req;

    return res.status(200).json({
      status: 'success',
      message: 'Restaurant was found 🥣🥑',
      restaurant,
    });
  }
);

exports.updateReviewRestaurant = catchAsync(
  async (req, res, next) => {
    const { comment, rating } = req.body;
    const { review } = req;

    await review.update({
      comment,
      rating,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Review has been updated 🥩🥣',
    });
  }
);

exports.deleteRestaurant = catchAsync(
  async (req, res, next) => {
    const { restaurant } = req;

    await restaurant.update({
      status: 'disabled',
    });

    return res.status(200).json({
      status: 'success',
      message:
        'Restaurant has been disabled 😨🍗🥩',
    });
  }
);

exports.createReviewRestaurant = catchAsync(async(req,res) => {
  const {sessionUser} = req
  const {id} = req.params
  const {comment, rating} = req.body
  const review = await Review.create({
      userId: sessionUser.id,
      restaurantId: id,
      comment,
      rating,
  })
  res.status(201).json({
      status: "succes",
      review
  })
})

exports.updateReviewRestaurant = catchAsync(
  async (req, res, next) => {
    const { comment, rating } = req.body;
    const user = req.sessionUser;
    const { review } = req;

    if (review.userId !== user.id) {
      return next(
        new AppError(
          'You are not authorized to update this review',
          401
        )
      );
    }

    await Review.update(
      { comment, rating },
      {
        where: {
          id: req.params.id,
          restaurantId: req.params.restaurantId,
          userId: user.id,
        },
      }
    );

     res.status(200).json({
      status: 'success',
      message: 'Review has been updated',
    });
  })

exports.deleteReview = catchAsync(
  async (req, res, next) => {
    const { review } = req;

    await review.update({
      status: 'deleted',
    });

    return res.status(200).json({
      status: 'success',
      message: 'Review has been deleted 🥐😨🥩',
    });
  }
);

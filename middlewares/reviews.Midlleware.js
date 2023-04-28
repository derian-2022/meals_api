const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Reviews = require('../models/reviews.models');

exports.validIfExistReview = catchAsync(
  async (req, res, next) => {
    const { restaurantId, id } = req.params;

    const review = await Reviews.findOne({
      where: {
        id,
        restaurantId,
      },
    });
    if (!review) {
      return next(
        new AppError('Review not found', 404)
      );
    }
    req.review = review;
    next();
  }
);
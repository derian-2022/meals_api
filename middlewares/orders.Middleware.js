const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Order = require('../models/orders.model');
const User = require('../models/users.model');
const Meal = require('../models/meals.model');

exports.validIfExistOrder = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const order = await Order.findOne({
      where: {
        id,
        status: 'active',
      },
    });

    if (!order) {
      return next(
        new AppError(
          `Order id: ${id} not found`,
          404
        )
      );
    }
    if (order.status !== 'active') {
      return next(
        new AppError('The Order has already been delivered', 404)
      );
    }

    req.order = order;
    next();
  }
);

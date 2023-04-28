const catchAsync = require('../utils/catchAsync');
const Orders = require('../models/orders.models');
const AppError = require('../utils/appError');
const Restaurants = require('../models/restaurants.models');
const Meals = require('../models/meals.models');
const User = require('../models/user.models');

exports.createOrder = catchAsync(
  async (req, res, next) => {
    const { quantity, mealId } = req.body;
    const { sessionUser } = req;

    const meal = await Meals.findOne({
      where: {
        id: mealId,
        status: 'active',
      },
    });

    if (!meal)
      next(
        new AppError(
          'Meals was not found 😨🍟🌮🍊',
          404
        )
      );

    const order = await Orders.create({
      mealId,
      userId: sessionUser.id,
      quantity,
      totalPrice: meal.price * quantity,
    });

    res.status(201).json({
      status: 'success',
      message: 'Order has been created 🥓🍗🍖🥩',
      order,
    });
  }
);

exports.findOneOrder = catchAsync(
  async (req, res, next) => {
    const { sessionUser } = req;

    const user = await User.findOne({
      where: {
        id: sessionUser.id,
        status: 'active',
      },
      attributes: ['id', 'name', 'email', 'role'],
      include: [
        {
          model: Orders,
          attributes: [
            'id',
            'mealId',
            'totalPrice',
            'quantity',
          ],
          include: [
            {
              model: Meals,
              attributes: [
                'id',
                'name',
                'price',
                'restaurantId',
              ],
            },
          ],
        },
      ],
    });

    if (!user)
      next(
        new AppError('User not found 😨🥓🍗', 404)
      );

    res.status(200).json({
      status: 'success',
      message:
        'All orders has been found 🍖🥑🥣🥩',
      user,
    });
  }
);

exports.updateOrder = catchAsync(
  async (req, res, next) => {
    const { order } = req;

    await order.update({
      status: 'completed',
    });

    return res.status(200).json({
      message: 'updateOrder 🍖🥓',
    });
  }
);

exports.deleteOrder = catchAsync(
  async (req, res, next) => {
    const { order } = re;

    await order.update({
      status: 'cancelled',
    });

    return res.status(200).json({
      status: 'success',
      message:
        'You Order has been cancelled 🥑🥘🍗🥣',
    });
  }
);

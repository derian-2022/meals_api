const AppError = require('../utils/appError');
const Users = require('../models/user.models');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const Orders = require('../models/orders.models');
const Restaurants = require('../models/restaurants.models');
const Meals = require('../models/meals.models');

exports.createUser = catchAsync(
  async (req, res, next) => {
    const { name, email, password, role } =
      req.body;

    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(
      password,
      salt
    );

    const user = await Users.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: encryptedPassword,
      role,
    });

    const token = await generateJWT(user.id);

    return res.status(201).json({
      status: 'success',
      message:
        'the user has been createUser 😍🥑🍖',
      token,
      user: { name, email, role },
    });
  }
);

exports.loginUser = catchAsync(
  async (req, res, next) => {
    //1 traernos la informacion de la req.body
    const { email, password } = req.body;

    //2. buscar el usuario y revisar si existe
    const user = await Users.findOne({
      where: {
        email: email.toLowerCase(),
        status: 'active',
      },
    });

    if (!user) {
      return next(
        new AppError(
          'The user could not be found 😨🥑',
          404
        )
      );
    }

    //3 validar si la contraseña es correcta

    if (
      !(await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      return next(
        new AppError(
          'Incorrect email or password 😱🥓',
          401
        )
      );
    }

    //4. generar el jsonwebtoken
    const token = await generateJWT(user.id);

    //5 enviar la respuesta al cliente
    return res.status(200).json({
      status: 'success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }
);

exports.updateUser = catchAsync(
  async (req, res, next) => {
    const { name, email } = req.body;
    const { user } = req;

    await user.update({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
    });

    return res.status(200).json({
      status: 'success',
      message:
        'The user has been updated! 🤩🥣🥑🍖',
    });
  }
);

exports.deleteUser = catchAsync(
  async (req, res, next) => {
    const { user } = req;

    await user.update({
      status: 'disabled',
    });

    return res.status(200).json({
      status: 'success',
      message: 'the user has been deleted 🥑🥓🍗',
    });
  }
);

exports.findAllOrders = catchAsync(
  async (req, res, next) => {
    const { sessionUser } = req;

    const user = await Users.findOne({
      where: {
        id: sessionUser.id,
        status: 'active',
      },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: Orders,
          attributes: [
            'id',
            'mealId',
            'totalPrice',
            'quantity',
            'status',
          ],
          include: [
            {
              model: Restaurants,
              attributes: [
                'id',
                'name',
                'address',
                'rating',
              ],
            },
          ],
        },
      ],
    });

    if (!user)
      next(
        new AppError('The User not found', 404)
      );

    return res.status(200).json({
      status: 'success',
      message:
        'All orders has been found 🍗🥑🥓🍖🥩',
      user,
    });
  }
);

exports.findOneOrderById = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const { sessionUser } = req;

    const orders = await Order.findOne({
      where: {
        id,
        userId: sessionUser.id,
        status: 'active',
      },
      include: [{
        model: Meals,
        attributes: ['id', 'name', 'price'],
        include: [{
          model: Restaurants,
          attributes: ['id', 'name', 'address', 'rating'],
        }]
      }]
    });

    if(!orders) next(new AppError('The User dont have this order with id ${id}`, 404 😨🥑🍗'));

    return res.status(200).json({
      status: 'succes',
      message: 'The Order was found 🥑🍗🥓🥩',
      orders,
    });
  }
);

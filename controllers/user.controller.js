const Users  = require('../models/user.models');
const catchAsync  = require('../utils/catchAsync');

exports.createUser = catchAsync(async (req, res) => {


  return res.status(200).json({
    status: 'success',
    message: 'the user has been createUser',
  });
});

exports.loginUser = catchAsync(async (req, res) => {


  return res.status(200).json({
    status: 'success',
    message: 'the user has been login',
  });
});

exports.updateUser = catchAsync(async (req, res) => {

  return res.status(200).json({
    status: 'success',
    message: 'the user has been updated',
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
 

  return res.status(200).json({
    status: 'success',
    message: 'the user has been deleted',
  });
});

exports.findAllOrders = catchAsync(async (req, res) => {

    return res.status(200).json ({
      status: 'success',
      message: 'Hola',
   
    })
},

exports.findOneOrderById = catchAsync(async (req, res) => {

  return res.status(200).json({
    status: 'success',
    message: 'Hola',
  });
}));



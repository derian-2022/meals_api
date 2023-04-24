const catchAsync = require('../utils/catchAsync');
const Orders = require('../models/orders.models');


exports.createOrder = catchAsync(
  async (req, res, next) => {
    return res.status(200).json({
      message: 'createOrder',
    });
  }
);

exports.findOneOrder = catchAsync(
  async (req, res, next) => {
    console.log('golassss')
    return res.status(200).json({
      message: 'findOneOrder',
    });
  }
);

exports.updateOrder = catchAsync(
  async (req, res, next) => {
    return res.status(200).json({
        message: 'updateOrder',
      });
  }
);

exports.deleteOrder = catchAsync(
  async (req, res, next) => {
    return res.status(200).json({
        message: 'deleteOrder',
      });
  }
);

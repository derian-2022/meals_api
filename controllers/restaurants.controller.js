const Restaurants = require('../models/restaurants.models');
const catchAsync = require('../utils/catchAsync');

exports.createRestaurant = catchAsync(async (req, res) =>{
    res.status(201).json({
        status: "success",
        message: 'the user has been created new createRestaurant',
    })
}) 
  
exports.findAllRestaurant = catchAsync(async (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'the user has been YES findAllRestaurant',
      });
})

exports.findOneRestaurant = catchAsync(async (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'the user has been Ok findOneRestaurant',
      });
})

exports.updateRestaurant = catchAsync(async (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'the user has been updateRestaurant',
      });
})

exports.deleteRestaurant = catchAsync(async (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'the user has been deleteRestaurant',
      });
})

exports.createreview = catchAsync(async (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'the user has been createreview',
      });
})

exports.updatereview = catchAsync(async (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'the user has been updatereview',
      });
})

exports.deletereview = catchAsync(async (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'the user has been deletereview',
      });
})
const Meals = require('../models/meals.models');
const catchAsync = require('../utils/catchAsync');


exports.createMeals = catchAsync(async (req, res) => {
    res.status(201).json({
        status: "success",
        message: 'the user has been created new createMeals',
    })
});

exports.findAllMeals = catchAsync(async (req, res) => {
    res.status(201).json({
        status: "success",
        message: 'the user has been findAllMeals',
    })
})


exports.findOneMeals = catchAsync(async (req, res) => {
    res.status(201).json({
        status: "success",
        message: 'the user has been findOneMeals',
    })
})

exports.updateMeals = catchAsync(async (req, res) => {
    res.status(201).json({
        status: "success",
        message: 'the user has been updateMeals',
    })
})

exports.deleteMeals = catchAsync(async (req, res) => {
    res.status(201).json({
        status: "success",
        message: 'the user has been deleteMeals',
    })
})
const User = require('../models/user.models');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');


exports.validIfExistUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({
        where: {
            id,
            status: 'active',
        }
    })


    if(!user) {
        return  next(new AppError('User {id} not found', 404))
    }

    req.user = user;
    next();
})


exports.validIfExistEmail = catchAsync(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({
        where: {
            email,
        }
    })

    if(user) {
        return  next(new AppError('The Email Already Exists in the Database', 400))
    }
    next();
})
const Meals = require('./meals.models');
const Orders = require('./orders.models');
const Restaurants = require('./restaurants.models');
const Reviews = require('./reviews.models');
const Users = require('./user.models');

const initModel = () => {
  Users.hasMany(Reviews);
  Reviews.belongsTo(Users);

  Users.hasMany(Orders);
  Orders.belongsTo(Users);

  Restaurants.hasMany(Reviews);
  Reviews.belongsTo(Restaurants);

  Restaurants.hasMany(Meals);
  Meals.belongsTo(Restaurants);

  Meals.hasOne(Orders);
  Orders.belongsTo(Meals);
};

module.exports = initModel;

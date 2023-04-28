const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Orders = db.define('orders', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mealId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      'active',
      'cancelled',
      'completed'
    ),
    allowNull: false,
    defaultValue: 'active',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Orders;

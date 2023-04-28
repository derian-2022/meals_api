const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Restaurants = db.define('restaurants', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Restaurants;

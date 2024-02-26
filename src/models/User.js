const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
  slackId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slackName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;

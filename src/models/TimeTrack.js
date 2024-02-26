const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const TimeTrack = sequelize.define('TimeTrack', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  timeIn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  timeOut: {
    type: DataTypes.STRING,
    allowNull: true
  },
  hours: {
    type: DataTypes.STRING,
    allowNull: true
  },
  timeSpent: {
    type: DataTypes.STRING,
    allowNull: true
  },
  entryDate: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'time_track',
  timestamps: true
});

module.exports = TimeTrack;

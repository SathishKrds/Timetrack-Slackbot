'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeTrack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TimeTrack.init({
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    timeIn: DataTypes.STRING,
    timeOut: DataTypes.STRING,
    hours: DataTypes.STRING,
    timeSpent: DataTypes.STRING,
    entryDate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TimeTrack',
  });
  return TimeTrack;
};
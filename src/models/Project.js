const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'projects',
  timestamps: true
});

module.exports = Project;

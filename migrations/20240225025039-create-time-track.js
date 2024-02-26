'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('time_track', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'projects',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      timeIn: {
        type: Sequelize.STRING,
        allowNull: true
      },
      timeOut: {
        type: Sequelize.STRING,
        allowNull: true
      },
      hours: {
        type: Sequelize.STRING,
        allowNull: true
      },
      timeSpent: {
        type: Sequelize.STRING,
        allowNull: true
      },
      entryDate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('time_track');
  }
};

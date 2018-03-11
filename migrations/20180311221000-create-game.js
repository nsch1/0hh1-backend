'use strict';

const {fillBoard} = require('../lib/game')

const [board, locked] = fillBoard(6)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      board: {
        type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER)),
        defaultValue: board
      },
      locked: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: locked
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Games');
  }
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Game = sequelize.define('Game', {
    user: DataTypes.INTEGER,
    board: DataTypes.JSON
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};
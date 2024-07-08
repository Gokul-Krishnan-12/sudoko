const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sudoku = sequelize.define('Sudoko_res', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  grid: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'incomplete',
  },
});

module.exports = Sudoku;

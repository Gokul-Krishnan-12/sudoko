const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Sudoko', 'root', 'White.Rabbit@@@!2022', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

module.exports = sequelize;
const sequelize = require('../config/database');
const Sudoku = require('../models/sudoko');

(async () => {
  await sequelize.sync({ force: true });
  console.log('Database synced');
  process.exit();
})();
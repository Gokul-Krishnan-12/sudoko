const Sudoku = require('../../models/Sudoku');
const sequelize = require('../../../config/database');

sequelize.sync();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const results = await Sudoku.findAll();
    res.status(200).json(results);
  } else {
    res.status(405).end();
  }
}

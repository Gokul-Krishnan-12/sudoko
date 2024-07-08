import { validateSudoku } from '../../../helper/validateSudoko';
import Sudoku from '../../../models/sudoko';


export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { grid } = req.body;

    if (!grid || !Array.isArray(grid) || grid.length !== 4 || grid.some(row => row.length !== 4)) {
      return res.status(400).json({ message: 'Invalid Sudoku grid' });
    }

    const isValid = validateSudoku(grid);

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid Sudoku grid' });
    }

    const sudoku = await Sudoku.create({ grid: JSON.stringify(grid), status: 'validating' });

    return res.status(200).json({ message: 'Grid is valid', id: sudoku.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
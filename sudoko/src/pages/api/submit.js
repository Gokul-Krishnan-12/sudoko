import Sudoku from '../../../models/sudoko';


export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { grid, id } = req.body;

    if (!grid || !Array.isArray(grid) || grid.length !== 4 || grid.some(row => row.length !== 4)) {
      return res.status(400).json({ message: 'Invalid Sudoku grid' });
    }

    await Sudoku.update({ status: 'submitted', grid: JSON.stringify(grid) }, { where: { id } });

    return res.status(200).json({ message: 'Grid submitted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
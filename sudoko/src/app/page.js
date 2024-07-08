'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const initialGrid = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => ''));
  const [grid, setGrid] = useState(initialGrid);
  const [message, setMessage] = useState('');
  const [sudokuId, setSudokuId] = useState(null);
  const [submitted,setIsSubmit]=useState(false);

  const handleChange = (e, row, col) => {
    const value = e.target.value.replace(/[^1-4]/g, ''); // Allow only digits 1-4
    setGrid(prevGrid => {
      const newGrid = prevGrid.map((currentRow, rowIndex) =>
        rowIndex === row
          ? currentRow.map((currentCell, colIndex) =>
              colIndex === col ? value : currentCell
            )
          : currentRow
      );
      return newGrid;
    });
  };

  const validate = async () => {
    try {
      const res = await axios.post('/api/validate', { grid });
      setMessage(res.data.message);
      setSudokuId(res.data.id);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Validation failed');
    }
  };

  const submit = async () => {
    try {
      setIsSubmit(true);
      const res = await axios.post('/api/submit', { grid, id: sudokuId });
      setMessage(res.data.message);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <div className="container">
      <h1>Sudoku Game</h1>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                className="cell"
                value={cell === '0' ? '' : cell}
                onChange={(e) => handleChange(e, rowIndex, colIndex)}
                maxLength="1"
              />
            ))}
          </div>
        ))}
      </div>
      <div className="buttons">
        {!submitted &&
        <button onClick={validate}>Validate</button>}
        <button onClick={submit}>Submit</button>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

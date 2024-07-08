
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get('/api/results');
        setResults(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div>
      <h1>Validation Results</h1>
      {results.map((result, index) => (
        <div key={index}>
          <h2>Sudoku #{result.id}</h2>
          <p>Status: {result.status}</p>
          <table>
            {result.grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </table>
        </div>
      ))}
    </div>
  );
}

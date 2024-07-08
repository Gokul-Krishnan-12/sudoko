export function validateSudoku(grid) {
    const size = 4;
    const boxSize = 2;
  
    const rows = Array.from({ length: size }, () => new Set());
    const cols = Array.from({ length: size }, () => new Set());
    const boxes = Array.from({ length: size }, () => new Set());
  
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const value = grid[r][c];
        if (value === '') continue; // Skip empty cells
        if (rows[r].has(value) || cols[c].has(value) || boxes[Math.floor(r / boxSize) * boxSize + Math.floor(c / boxSize)].has(value)) {
          return false;
        }
        rows[r].add(value);
        cols[c].add(value);
        boxes[Math.floor(r / boxSize) * boxSize + Math.floor(c / boxSize)].add(value);
      }
    }
    return true;
  }
  
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const isValid = (board, row, col, num) => {
  const strNum = String(num);
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === strNum && i !== col) return false;
  }
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === strNum && i !== row) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const r = startRow + i;
      const c = startCol + j;
      if (board[r][c] === strNum && (r !== row || c !== col)) return false;
    }
  }
  return true;
};

// Asynchronous backtracking solver for visualization
export const solveSudokuVisual = async (board, onUpdate, delay = 10, cancelToken) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === '') {
        for (let num = 1; num <= 9; num++) {
          if (cancelToken.current) return false; // Exit if cancelled
          
          if (isValid(board, row, col, num)) {
            board[row][col] = String(num);
            if (onUpdate) await onUpdate([...board.map(r => [...r])], row, col);
            if (delay > 0) await sleep(delay);

            if (await solveSudokuVisual(board, onUpdate, delay, cancelToken)) {
              return true;
            }
            
            // Backtrack
            board[row][col] = '';
            if (onUpdate) await onUpdate([...board.map(r => [...r])], row, col);
            // If we are visualizing fast, maybe skip delay on backtrack to save time, 
            // but let's keep it to show the full algorithm.
            if (delay > 0) await sleep(delay);
          }
        }
        return false;
      }
    }
  }
  return true;
};

// Fast solver to generate valid boards
const fastSolve = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === '') {
        // Randomize 1-9 to generate different boards
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        for (let num of nums) {
          if (isValid(board, row, col, num)) {
            board[row][col] = String(num);
            if (fastSolve(board)) return true;
            board[row][col] = '';
          }
        }
        return false;
      }
    }
  }
  return true;
};

export const generatePuzzle = (difficulty = 40) => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(''));
  fastSolve(board); // Fill a complete valid board
  
  // Remove cells based on difficulty
  const puzzle = board.map(row => [...row]);
  let removed = 0;
  while (removed < difficulty) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== '') {
      puzzle[row][col] = '';
      removed++;
    }
  }
  return puzzle;
};

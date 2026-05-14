import React, { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';
import SudokuBoard from './components/SudokuBoard';
import ControlPanel from './components/ControlPanel';
import AlgorithmTutorial from './components/AlgorithmTutorial';
import { solveSudokuVisual, generatePuzzle } from './utils/sudokuSolver';
import useScrollReveal from './hooks/useScrollReveal';

function App() {
  const createEmptyBoard = () => Array.from({ length: 9 }, () => Array(9).fill(''));
  
  const [board, setBoard] = useState(createEmptyBoard());
  const [initialBoard, setInitialBoard] = useState(createEmptyBoard());
  const [activeCell, setActiveCell] = useState(null);
  const [isSolving, setIsSolving] = useState(false);
  const [speed, setSpeed] = useState(10); // Default to 10ms
  const [toastMessage, setToastMessage] = useState(null);
  
  const cancelToken = useRef(false);

  useScrollReveal(); // Initialize scroll reveal animations

  // Initialize with a puzzle on load
  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = useCallback(() => {
    cancelToken.current = true; // Stop any ongoing solve
    setIsSolving(false);
    setActiveCell(null);
    const newPuzzle = generatePuzzle(45); // Adjust difficulty
    setBoard(newPuzzle);
    setInitialBoard(newPuzzle.map(row => [...row]));
  }, []);

  const handleChange = useCallback((row, col, value) => {
    setBoard(prev => {
      const newBoard = prev.map(r => [...r]);
      newBoard[row][col] = value;
      return newBoard;
    });
    
    setInitialBoard(prev => {
      const newInitial = prev.map(r => [...r]);
      newInitial[row][col] = value;
      return newInitial;
    }); 
  }, []);

  const handleClear = useCallback(() => {
    cancelToken.current = true;
    setIsSolving(false);
    setActiveCell(null);
    setBoard(createEmptyBoard());
    setInitialBoard(createEmptyBoard());
  }, []);

  const handleSolve = useCallback(async () => {
    setIsSolving(true);
    cancelToken.current = false;

    // Make a fresh copy for the solver from the initial board state
    const boardToSolve = initialBoard.map(row => [...row]);
    
    // Immediately show the initial state before solving
    setBoard(initialBoard.map(row => [...row]));

    const onUpdate = async (newBoard, row, col) => {
      setBoard(newBoard);
      setActiveCell([row, col]);
    };
    
    const startTime = performance.now();
    const success = await solveSudokuVisual(boardToSolve, onUpdate, speed, cancelToken);
    const endTime = performance.now();

    setActiveCell(null);
    setIsSolving(false);

    if (cancelToken.current) return;

    if (success) {
      const timeSec = ((endTime - startTime) / 1000).toFixed(2);
      showToast(`Puzzle Solved in ${timeSec}s!`);
    } else {
      showToast('No solution exists for this configuration.');
    }
  }, [initialBoard, speed]);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  }, []);

  return (
    <div className="app-container">
      <header className="header reveal-on-scroll">
        <h1>Online Sudoku Solver</h1>
        <p>Interactive Backtracking Visualization</p>
      </header>

      <div className="main-content">
        <div className="board-section reveal-on-scroll delay-100">
          <SudokuBoard 
            board={board} 
            initialBoard={initialBoard} 
            activeCell={activeCell} 
            onChange={handleChange} 
            isSolving={isSolving} 
          />
          <ControlPanel 
            onSolve={handleSolve} 
            onClear={handleClear} 
            onGenerate={handleGenerate} 
            isSolving={isSolving} 
            speed={speed} 
            setSpeed={setSpeed} 
          />
        </div>
        
        <div className="side-panel reveal-on-scroll delay-200">
          <AlgorithmTutorial />
        </div>
      </div>

      {toastMessage && <div className="toast">{toastMessage}</div>}
    </div>
  );
}

export default App;

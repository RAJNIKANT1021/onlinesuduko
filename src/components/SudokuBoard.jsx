import React, { memo } from 'react';
import './SudokuBoard.css';

const SudokuCell = memo(({ value, rowIndex, colIndex, isInitial, isActive, onChange, isSolving }) => {
  let cellClass = 'sudoku-cell';
  if (colIndex % 3 === 2 && colIndex !== 8) cellClass += ' border-right';
  if (rowIndex % 3 === 2 && rowIndex !== 8) cellClass += ' border-bottom';
  if (isInitial) cellClass += ' initial-cell';
  if (isActive) cellClass += ' active-cell';

  const handleChange = (e) => {
    if (isSolving) return;
    const val = e.target.value;
    if (val === '' || /^[1-9]$/.test(val)) {
      onChange(rowIndex, colIndex, val);
    }
  };

  return (
    <input
      type="text"
      className={cellClass}
      value={value}
      onChange={handleChange}
      readOnly={isInitial || isSolving}
      maxLength={1}
    />
  );
});

const SudokuBoard = memo(({ board, initialBoard, activeCell, onChange, isSolving }) => {
  return (
    <div className="sudoku-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cell, colIndex) => {
            const isInitial = initialBoard[rowIndex][colIndex] !== '';
            const isActive = activeCell !== null && activeCell[0] === rowIndex && activeCell[1] === colIndex;
            return (
              <SudokuCell
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                rowIndex={rowIndex}
                colIndex={colIndex}
                isInitial={isInitial}
                isActive={isActive}
                onChange={onChange}
                isSolving={isSolving}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
});

export default SudokuBoard;

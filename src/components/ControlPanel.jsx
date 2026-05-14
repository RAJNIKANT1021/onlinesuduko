import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({ 
  onSolve, 
  onClear, 
  onGenerate, 
  isSolving, 
  speed, 
  setSpeed 
}) => {
  return (
    <div className="control-panel">
      <div className="button-group">
        <button 
          className="btn primary-btn" 
          onClick={onSolve} 
          disabled={isSolving}
        >
          {isSolving ? 'Solving...' : 'Visualize Solve'}
        </button>
        <button 
          className="btn secondary-btn" 
          onClick={onGenerate} 
          disabled={isSolving}
        >
          New Puzzle
        </button>
        <button 
          className="btn danger-btn" 
          onClick={onClear} 
          disabled={isSolving}
        >
          Clear Board
        </button>
      </div>

      <div className="speed-control">
        <label>Visualization Speed: {speed === 0 ? 'Instant' : `${speed}ms`}</label>
        <input 
          type="range" 
          min="0" 
          max="100" 
          step="5"
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))} 
          disabled={isSolving}
        />
        <div className="speed-labels">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;

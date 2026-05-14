import React from 'react';
import './AlgorithmTutorial.css';

const AlgorithmTutorial = () => {
  return (
    <div className="tutorial-container">
      <h2>🧠 How it Works</h2>
      <p className="tutorial-intro">
        This solver uses the <strong>Backtracking Algorithm</strong>, a classic computer science technique for constraint satisfaction problems.
      </p>
      
      <div className="tutorial-step reveal-on-scroll delay-100">
        <div className="step-number">1</div>
        <div className="step-content">
          <h3>Find an Empty Cell</h3>
          <p>The algorithm scans the board from left to right, top to bottom, looking for the first empty cell.</p>
        </div>
      </div>

      <div className="tutorial-step reveal-on-scroll delay-200">
        <div className="step-number">2</div>
        <div className="step-content">
          <h3>Guess a Number</h3>
          <p>It tries placing the digits <strong>1 through 9</strong> in that cell.</p>
        </div>
      </div>

      <div className="tutorial-step reveal-on-scroll delay-300">
        <div className="step-number">3</div>
        <div className="step-content">
          <h3>Validate the Guess</h3>
          <p>It checks the constraints: Is this number already in the same row, column, or 3x3 subgrid? If valid, it temporarily locks it in and moves to the next empty cell (Step 1).</p>
        </div>
      </div>

      <div className="tutorial-step reveal-on-scroll delay-300">
        <div className="step-number">4</div>
        <div className="step-content">
          <h3>Backtrack! <span className="highlight">(The Magic)</span></h3>
          <p>If it reaches a point where no digits from 1-9 are valid, it means a previous guess was wrong. It <strong>erases</strong> the current cell, steps back to the previous cell, and tries the next possible digit. This is what you see when the red cursor rapidly moves backwards!</p>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmTutorial;

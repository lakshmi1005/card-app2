import React from 'react';
import './Controls.css';

const Controls = ({ onShuffle, onSort, onReset, loading }) => {
  return (
    <div className="controls">
      <button
        onClick={onShuffle}
        disabled={loading}
        className="control-button shuffle-btn"
      >
        {loading ? 'Processing...' : 'Shuffle Deck'}
      </button>
      
      <button
        onClick={onSort}
        disabled={loading}
        className="control-button sort-btn"
      >
        {loading ? 'Processing...' : 'Sort Deck'}
      </button>
      
      <button
        onClick={onReset}
        disabled={loading}
        className="control-button reset-btn"
      >
        {loading ? 'Processing...' : 'Reset Deck'}
      </button>
    </div>
  );
};

export default Controls;
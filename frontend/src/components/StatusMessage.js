import React from 'react';
import './StatusMessage.css';

const StatusMessage = ({ message, algorithm }) => {
  return (
    <div className="status-message">
      <p className="message">{message}</p>
      {algorithm && (
        <p className="algorithm-info">Algorithm used: {algorithm}</p>
      )}
    </div>
  );
};

export default StatusMessage;
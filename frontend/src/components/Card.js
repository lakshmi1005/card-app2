import React from 'react';
import './Card.css';

const Card = ({ card }) => {
  const getCardColor = (suit) => {
    return suit === '♥' || suit === '♦' ? 'red' : 'black';
  };

  return (
    <div className={`card ${getCardColor(card.suit)}`}>
      <div className="card-rank">{card.rank}</div>
      <div className="card-suit">{card.suit}</div>
    </div>
  );
};

export default Card;
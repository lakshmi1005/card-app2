import React from 'react';
import Card from './Card';
import './CardDeck.css';

const CardDeck = ({ deck, loading }) => {
  if (loading) {
    return (
      <div className="card-deck loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="card-deck">
      <div className="cards-container">
        {deck.map((card, index) => (
          <Card key={`${card.suit}-${card.rank}-${index}`} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CardDeck;
import React from 'react';
import CardGrid from './CardGrid';

function Collection({ cards }) {
  const handleAddToDeck = (cardId: string) => {
    // Implement the logic to add a card to a deck
    console.log(`Add card ${cardId} to deck`);
  };

  return (
    <div className="p-4">
      {cards && <CardGrid cards={cards} onAddToDeck={handleAddToDeck} />}
      {cards && cards.length === 0 && (
        <p className="text-center mt-4">No cards found.</p>
      )}
    </div>
  );
}

export default Collection;

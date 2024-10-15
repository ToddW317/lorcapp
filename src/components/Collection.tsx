import React, { useState, useMemo } from 'react';
import CardGrid from './CardGrid';
import SearchBar from './SearchBar';
import { Card } from '../types/card';

interface CollectionProps {
  cards: Card[];
  onAddToDeck: (cardId: string) => void;
}

function Collection({ cards, onAddToDeck }: CollectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCards = useMemo(() => {
    return cards.filter(card =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cards, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="p-4">
      <SearchBar onSearch={handleSearch} />
      {filteredCards.length > 0 ? (
        <CardGrid cards={filteredCards} onAddToDeck={onAddToDeck} />
      ) : (
        <p className="text-center mt-4">No cards found.</p>
      )}
    </div>
  );
}

export default Collection;

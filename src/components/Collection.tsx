import React, { useState, useMemo } from 'react';
import CardGrid from './CardGrid';
import SearchBar from './SearchBar';
import FilterSidebar from './FilterSidebar';
import { Card } from '../types/card';

interface CollectionProps {
  cards: Card[];
  onAddToDeck: (cardId: string) => void;
}

function Collection({ cards, onAddToDeck }: CollectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    colors: [],
    types: [],
    rarities: [],
    costs: [],
    inkwell: [],
  });

  const filteredCards = useMemo(() => {
    return cards.filter(card =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.colors.length === 0 || filters.colors.includes(card.color)) &&
      (filters.types.length === 0 || filters.types.includes(card.type)) &&
      (filters.rarities.length === 0 || filters.rarities.includes(card.rarity)) &&
      (filters.costs.length === 0 || filters.costs.includes(card.cost.toString())) &&
      (filters.inkwell.length === 0 || filters.inkwell.includes(card.inkwell.toString()))
    );
  }, [cards, searchTerm, filters]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex">
      <FilterSidebar cards={cards} onFilterChange={handleFilterChange} filters={filters} />
      <div className="flex-1 pl-4">
        <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
        {filteredCards.length > 0 ? (
          <CardGrid cards={filteredCards} onAddToDeck={onAddToDeck} />
        ) : (
          <p className="text-center mt-4">No cards found.</p>
        )}
      </div>
    </div>
  );
}

export default Collection;

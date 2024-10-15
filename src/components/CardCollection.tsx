import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCards } from '../api/cards';
import CardGrid from './CardGrid';
import { AddCardToDeck } from './AddCardToDeck';
import { useDispatch } from 'react-redux';
import { setAllCards } from '../store/decksSlice';
import SearchBar from './SearchBar';
import FilterSidebar from './FilterSidebar';
import { Card } from '../types/card';
import { Filters }  from '../types/filters';

function CardCollection() {
  const dispatch = useDispatch();
  const { data: cards = [], error, isLoading } = useQuery<Card[], Error>({
    queryKey: ['cards'],
    queryFn: fetchCards,
    retry: 3,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({
    colors: [],
    types: [],
    rarities: [],
    costs: [],
    inkwell: [],
  });

  useEffect(() => {
    console.log('Cards data changed:', cards.length);
    if (cards.length > 0) {
      dispatch(setAllCards(cards));
    }
  }, [cards, dispatch]);

  if (isLoading) {
    console.log('Loading cards...');
    return <div>Loading cards...</div>;
  }
  if (error) {
    console.log('Error loading cards:', error.message);
    return <div>Error loading cards: {error.message}</div>;
  }
  if (cards.length === 0) {
    console.log('No cards available');
    return <div>No cards available</div>;
  }

  console.log(`Rendering ${cards.length} cards`);

  const filteredCards = cards.filter(card => {
    return (
      (card.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? true) &&
      (filters.colors.length === 0 || (card.color && filters.colors.includes(card.color))) &&
      (filters.types.length === 0 || (card.type && filters.types.includes(card.type))) &&
      (filters.rarities.length === 0 || (card.rarity && filters.rarities.includes(card.rarity))) &&
      (filters.costs.length === 0 || (card.cost !== undefined && filters.costs.includes(card.cost.toString()))) &&
      (filters.inkwell.length === 0 || (card.inkwell !== undefined && filters.inkwell.includes(card.inkwell.toString())))
    );
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex">
      <FilterSidebar cards={cards} onFilterChange={handleFilterChange} filters={filters} />
      <div className="flex-1 pl-4">
        <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
        {filteredCards.length > 0 ? (
          <CardGrid cards={filteredCards} onAddToDeck={(cardId) => {/* Add to deck logic */}} />
        ) : (
          <p className="text-center mt-4">No cards found matching the current filters.</p>
        )}
      </div>
    </div>
  );
}

export default CardCollection;

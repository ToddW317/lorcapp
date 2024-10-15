import React, { useState, useTransition } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCards } from '../api/cards';
import CardGrid from './CardGrid';
import { AddCardToDeck } from './AddCardToDeck';
import { useDispatch } from 'react-redux';
import { addCardToDeck } from '../store/decksSlice';
import SearchBar from './SearchBar';
import FilterSidebar from './FilterSidebar';
import { Card } from '../types/card';

interface Filters {
  colors: string[];
  types: string[];
  rarities: string[];
  costs: string[];
  inkwell: string[];
}

function CardCollection() {
  const [isPending, startTransition] = useTransition();
  const { data: cards, error, isLoading } = useQuery<Card[]>({
    queryKey: ['cards'],
    queryFn: fetchCards,
    staleTime: Infinity,
  });

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({
    colors: [],
    types: [],
    rarities: [],
    costs: [],
    inkwell: [],
  });

  const handleAddToDeck = (cardId: string) => {
    setSelectedCardId(cardId);
  };

  const onAddToDeck = (deckId: string, cardId: string, quantity: number) => {
    dispatch(addCardToDeck({ deckId, cardId, quantity }));
    setSelectedCardId(null);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const filteredCards = cards ? cards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filters.colors.length === 0 || filters.colors.includes(card.color)) &&
    (filters.types.length === 0 || filters.types.includes(card.type)) &&
    (filters.rarities.length === 0 || filters.rarities.includes(card.rarity)) &&
    (filters.costs.length === 0 || filters.costs.includes(card.cost?.toString() || '')) &&
    (filters.inkwell.length === 0 || filters.inkwell.includes(card.inkwell?.toString() || ''))
  ) : [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="flex">
      <FilterSidebar cards={cards || []} onFilterChange={handleFilterChange} filters={filters} />
      <div className="flex-1 pl-4">
        <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
        {filteredCards.length > 0 ? (
          <CardGrid cards={filteredCards} onAddToDeck={handleAddToDeck} />
        ) : (
          <p className="text-center mt-4">No cards found.</p>
        )}
        {selectedCardId && (
          <AddCardToDeck
            cardId={selectedCardId}
            onClose={() => setSelectedCardId(null)}
            onAddToDeck={onAddToDeck}
          />
        )}
      </div>
    </div>
  );
}

export default CardCollection;

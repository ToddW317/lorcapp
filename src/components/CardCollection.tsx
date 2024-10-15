import React, { useState, useTransition } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCards } from '../api/cards';
import CardGrid from './CardGrid';
import { AddCardToDeck } from './AddCardToDeck';
import { useDispatch } from 'react-redux';
import { addCardToDeck } from '../store/decksSlice';

function CardCollection() {
  const [isPending, startTransition] = useTransition();
  const { data: cards, error, isLoading } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards,
    staleTime: Infinity,
  });

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleAddToDeck = (cardId: string) => {
    setSelectedCardId(cardId);
  };

  const onAddToDeck = (deckId: string, cardId: string, quantity: number) => {
    dispatch(addCardToDeck({ deckId, cardId, quantity }));
    setSelectedCardId(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="flex-1">
      {cards && <CardGrid cards={cards} onAddToDeck={handleAddToDeck} />}
      {selectedCardId && (
        <AddCardToDeck
          cardId={selectedCardId}
          onClose={() => setSelectedCardId(null)}
          onAddToDeck={onAddToDeck}
        />
      )}
    </div>
  );
}

export default CardCollection;

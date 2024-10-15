import React, { useState, useTransition } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCards } from '../api/cards';
import Collection from './Collection';
import { AddCardToDeck } from './AddCardToDeck';

function CardCollection() {
  const [isPending, startTransition] = useTransition();
  const { data: cards, error, isLoading } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCards,
    staleTime: Infinity,
  });

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const handleAddToDeck = (cardId: string) => {
    setSelectedCardId(cardId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="p-4">
      {cards && <Collection cards={cards} onAddToDeck={handleAddToDeck} />}
      {selectedCardId && (
        <AddCardToDeck
          cardId={selectedCardId}
          onClose={() => setSelectedCardId(null)}
        />
      )}
    </div>
  );
}

export default CardCollection;

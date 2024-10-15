import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addCardToDeck, Deck } from '../store/decksSlice';

interface AddCardToDeckProps {
    cardId: string;
    onClose: () => void;
    onAddToDeck: (deckId: string, cardId: string, quantity: number) => void;
  }

export function AddCardToDeck({ cardId, onClose, onAddToDeck }: AddCardToDeckProps) {
  const dispatch = useDispatch();
  const decks = useSelector((state: RootState) => state.decks.decks);
  const [selectedDeckId, setSelectedDeckId] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const handleAddCard = () => {
    if (selectedDeckId) {
      onAddToDeck(selectedDeckId, cardId, quantity);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Add Card to Deck</h2>
        <select
          value={selectedDeckId}
          onChange={(e) => setSelectedDeckId(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">Select a deck</option>
          {decks.map((deck: Deck) => (
            <option key={deck.id} value={deck.id}>{deck.name}</option>
          ))}
        </select>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          max="4"
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="flex justify-end">
          <button
            onClick={handleAddCard}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

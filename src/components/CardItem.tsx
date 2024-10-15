import React from 'react';
import { Card } from '../types/card';
import { cn } from '../utils/cn';

interface CardItemProps {
  card: Card;
  onAddToDeck: (cardId: string) => void;
}

function CardItem({ card, onAddToDeck }: CardItemProps) {
  return (
    <div className="border p-4 rounded shadow w-64 h-96 flex flex-col overflow-hidden">
      {card.image && (
        <img src={card.image} alt={card.name} className="w-full h-48 object-cover mb-2" />
      )}
      <h3 className="text-lg font-semibold truncate">{card.name}</h3>
      <p className="text-sm text-gray-600 truncate">{card.type} {card.subtype && `- ${card.subtype}`}</p>
      <p className="text-sm">Ink: {card.inkwell} | Color: {card.color}</p>
      <p className="text-sm">Rarity: {card.rarity} | Set: {card.set}</p>
      {(card.strength || card.willpower || card.lore) && (
        <p className="text-sm truncate">
          {card.strength !== null && `Str: ${card.strength} `}
          {card.willpower !== null && `Will: ${card.willpower} `}
          {card.lore !== null && `Lore: ${card.lore}`}
        </p>
      )}
      {card.text && <p className={cn("text-xs mt-1 flex-grow overflow-y-auto", card.flavor ? "" : "mb-2")}>{card.text}</p>}
      {card.flavor && <p className="text-xs mt-1 italic truncate">{card.flavor}</p>}
      <button
        onClick={() => onAddToDeck(card.id)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Add to Deck
      </button>
    </div>
  );
}

export default CardItem;

import React from 'react';
import { Card } from '../types/card';

interface CardItemProps {
  card: Card;
  onAddToDeck: (cardId: string) => void;
}

function CardItem({ card, onAddToDeck }: CardItemProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
      <div className="mb-2">
        <img src={card.image} alt={card.name} className="w-full h-auto rounded-md" />
      </div>
      <div className="mb-2">
        <h3 className="text-lg font-semibold">{card.name}</h3>
      </div>
      <div className="flex justify-between items-center mb-2 text-xs text-gray-500">
        <span>{card.rarity}</span>
        <span>{card.set}</span>
      </div>
      {(card.strength !== null || card.willpower !== null || card.lore !== null) && (
        <div className="flex justify-between mb-2 text-xs font-bold">
          {card.strength !== null && <span className="text-red-600">STR {card.strength}</span>}
          {card.willpower !== null && <span className="text-blue-600">WILL {card.willpower}</span>}
          {card.lore !== null && <span className="text-green-600">LORE {card.lore}</span>}
        </div>
      )}
      {card.text && (
        <div className="mb-2 flex-grow overflow-y-auto">
          <p className="text-xs text-gray-700">{truncateText(card.text, 140)}</p>
        </div>
      )}
      {card.flavor && (
        <p className="text-xs italic text-gray-500 mb-2">{truncateText(card.flavor, 140)}</p>
      )}
      <button
        onClick={() => onAddToDeck(card.id)}
        className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Add to Deck
      </button>
    </div>
  );
}

export default CardItem;

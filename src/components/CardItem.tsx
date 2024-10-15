import React, { useState } from 'react';
import { Card } from '../types/card';

interface CardItemProps {
  card: Card;
  onAddToDeck: (cardId: string) => void;
}

function CardItem({ card, onAddToDeck }: CardItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col h-[32rem] w-64">
        <div className="relative h-48">
          {card.image && (
            <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
          )}
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
            {card.inkwell}
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold mb-2 text-gray-800">{card.name}</h3>
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="font-semibold text-gray-600">{card.type}</span>
            <span className="font-semibold text-gray-600">{card.color}</span>
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
              <p className="text-xs text-gray-700">{card.text}</p>
            </div>
          )}
          {card.flavor && (
            <p className="text-xs italic text-gray-500 mb-2">{card.flavor}</p>
          )}
        </div>
        <button
          onClick={() => onAddToDeck(card.id)}
          className="w-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-colors duration-200 font-semibold text-sm"
        >
          Add to Deck
        </button>
      </div>

      {isHovered && (
        <div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-auto">
          <img 
            src={card.image} 
            alt={card.name} 
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}

export default CardItem;

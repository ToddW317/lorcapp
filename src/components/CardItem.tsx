import React from 'react';
import { Card } from '../types/card';

interface CardItemProps {
  card: Card;
}

function CardItem({ card }: CardItemProps) {
  return (
    <div className="border p-4 rounded shadow">
      {card.image && <img src={card.image} alt={card.name} className="w-full h-auto" />}
      <h3 className="text-lg font-semibold mt-2">{card.name}</h3>
      <p className="text-sm text-gray-600">{card.type} {card.subtype && `- ${card.subtype}`}</p>
      <p className="text-sm">
        Ink: {card.inkwell} | Color: {card.color} | Rarity: {card.rarity}
      </p>
      {(card.strength || card.willpower || card.lore) && (
        <p className="text-sm">
          {card.strength && `Strength: ${card.strength} `}
          {card.willpower && `Willpower: ${card.willpower} `}
          {card.lore && `Lore: ${card.lore}`}
        </p>
      )}
      {card.text && <p className="text-sm mt-2">{card.text}</p>}
      {card.flavor && <p className="text-xs mt-2 italic">{card.flavor}</p>}
    </div>
  );
}

export default CardItem;
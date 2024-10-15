import React from 'react'
import { Card } from '../types/card'
import CardItem from './CardItem'

interface CardGridProps {
  cards: Card[]
  onAddToDeck: (cardId: string) => void
}

function CardGrid({ cards, onAddToDeck }: CardGridProps) {
  console.log('Filtered cards in CardGrid:', cards);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <CardItem key={card.id || `${card.Set_Name}-${index}`} card={card} onAddToDeck={onAddToDeck} />
      ))}
    </div>
  )
}

export default CardGrid

import React from 'react'
import { Card } from '../types/card'
import CardItem from './CardItem'

interface CardGridProps {
  cards: Card[]
  onAddToDeck: (cardId: string) => void
}

function CardGrid({ cards, onAddToDeck }: CardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {cards.map((card) => (
        <CardItem key={card.id} card={card} onAddToDeck={onAddToDeck} />
      ))}
    </div>
  )
}

export default CardGrid

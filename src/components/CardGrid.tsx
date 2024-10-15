import React from 'react'
import { Card } from '../types/card'
import CardItem from './CardItem'

interface CardGridProps {
  cards: Card[]
  onAddToDeck: (cardId: string) => void
}

function CardGrid({ cards, onAddToDeck }: CardGridProps) {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-y-12 gap-x-8 px-10">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} onAddToDeck={onAddToDeck} />
        ))}
      </div>
    </div>
  )
}

export default CardGrid

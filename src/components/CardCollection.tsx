import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCards } from '../api/cards'
import { Card } from '../types/card'

function CardCollection() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data, error, isLoading } = useQuery({
    queryKey: ['cards', searchTerm],
    queryFn: () => fetchCards(searchTerm),
    staleTime: Infinity,
  })

  if (isLoading) return <div className="text-center p-4">Loading...</div>
  if (error) return <div className="text-center p-4 text-red-500">An error occurred: {(error as Error).message}</div>

  return (
    <div className="p-4">
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Search cards..."
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.cards.map((card: Card, index: number) => (
          <div key={card.id || `${card.name}-${index}`} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">{card.name}</h2>
            <p><span className="font-semibold">Type:</span> {card.type} {card.subtype && `- ${card.subtype}`}</p>
            <p><span className="font-semibold">Ink Cost:</span> {card.inkwell}</p>
            <p><span className="font-semibold">Strength:</span> {card.strength}</p>
            <p><span className="font-semibold">Willpower:</span> {card.willpower}</p>
            <p><span className="font-semibold">Lore:</span> {card.lore}</p>
            <p><span className="font-semibold">Color:</span> {card.color}</p>
            <p><span className="font-semibold">Rarity:</span> {card.rarity}</p>
            <p><span className="font-semibold">Set:</span> {card.set}</p>
            <p><span className="font-semibold">Number:</span> {card.number}</p>
            <p><span className="font-semibold">Artist:</span> {card.artist}</p>
            {card.text && <p><span className="font-semibold">Text:</span> {card.text}</p>}
            {card.flavor && <p><span className="font-semibold">Flavor:</span> <em>{card.flavor}</em></p>}
            {card.image && <img src={card.image} alt={card.name} className="mt-2 w-full" />}
          </div>
        ))}
      </div>
      {data?.cards.length === 0 && (
        <p className="text-center mt-4">No cards found. Try a different search term.</p>
      )}
    </div>
  )
}

export default CardCollection

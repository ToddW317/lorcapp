import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCards, Card } from '../api/cards'

function CardCollection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 20

  const { data, isLoading, error } = useQuery({
    queryKey: ['cards', searchTerm, page],
    queryFn: () => fetchCards(searchTerm, page, pageSize),
    retry: 1,
  })

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPage(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Card Collection</h1>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search cards..."
            className="flex-grow p-2 border rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors duration-200"
          >
            Search
          </button>
        </div>
      </form>

      {isLoading && <div className="text-center">Loading...</div>}
      {error && (
        <div className="text-center text-red-500">
          Error loading cards. Please try again later.
        </div>
      )}

      {data && data.cards && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.cards.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md ${
                page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            <span>Page {page} of {Math.ceil((data.total || 0) / pageSize)}</span>
            <button
              onClick={() => setPage((old) => old + 1)}
              disabled={!data.total || page === Math.ceil(data.total / pageSize)}
              className={`px-4 py-2 rounded-md ${
                !data.total || page === Math.ceil(data.total / pageSize) ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function CardItem({ card }: { card: Card }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={card.image} alt={card.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{card.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{card.type} - {card.subtype}</p>
        <p className="text-sm mb-2">Cost: {card.cost} | Inkwell: {card.inkwell}</p>
        <p className="text-sm mb-2">Strength: {card.strength} | Willpower: {card.willpower} | Lore: {card.lore}</p>
        <p className="text-sm font-semibold mt-2">
          Market Price: ${card.tcgplayer_price?.market?.toFixed(2) || 'N/A'}
        </p>
      </div>
    </div>
  )
}

export default CardCollection

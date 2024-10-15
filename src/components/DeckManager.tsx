import React, { useState, useTransition } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { deleteDeck, Deck } from '../store/decksSlice'
import DeckBuilderSidebar from './DeckBuilderSidebar'
import DeckDetails from './DeckDetails'

function DeckManager() {
  const [isPending, startTransition] = useTransition()
  const decks = useSelector((state: RootState) => state.decks.decks)
  const matches = useSelector((state: RootState) => state.decks.matches)
  const dispatch = useDispatch()
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDeckDetailsOpen, setIsDeckDetailsOpen] = useState(false)

  const handleDeleteDeck = (id: string) => {
    dispatch(deleteDeck(id))
    if (selectedDeck === id) {
      setSelectedDeck(null)
    }
  }

  const getDeckStats = (deckId: string) => {
    const deckMatches = matches.filter(match => match.deckId === deckId)
    return {
      wins: deckMatches.filter(match => match.result === 'win').length,
      losses: deckMatches.filter(match => match.result === 'loss').length,
      draws: deckMatches.filter(match => match.result === 'draw').length,
    }
  }

  const handleOpenDeckDetails = (deckId: string) => {
    setSelectedDeck(deckId)
    setIsDeckDetailsOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-heading font-bold">Deck Manager</h1>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-200"
        >
          Create New Deck
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map((deck: Deck) => {
          const stats = getDeckStats(deck.id)
          return (
            <div key={deck.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{deck.name}</h2>
              <p className="text-gray-600 mb-4">Colors: {deck.colors.join(', ')}</p>
              <div className="flex justify-between mb-4">
                <span>Wins: {stats.wins}</span>
                <span>Losses: {stats.losses}</span>
                <span>Draws: {stats.draws}</span>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleOpenDeckDetails(deck.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDeleteDeck(deck.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {isSidebarOpen && (
        <DeckBuilderSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
      )}

      {isDeckDetailsOpen && selectedDeck && (
        <DeckDetails
          deckId={selectedDeck}
          onClose={() => setIsDeckDetailsOpen(false)}
        />
      )}
    </div>
  )
}

export default DeckManager

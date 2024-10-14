import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { deleteDeck } from '../store/decksSlice'
import DeckBuilderSidebar from './DeckBuilderSidebar'

function DeckManager() {
  const decks = useSelector((state: RootState) => state.decks.decks)
  const matches = useSelector((state: RootState) => state.decks.matches)
  const dispatch = useDispatch()
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-heading font-bold mb-4">Your Decks</h2>
          {decks.length > 0 ? (
            <ul className="space-y-2">
              {decks.map((deck) => (
                <li
                  key={deck.id}
                  className={`p-3 rounded-md cursor-pointer transition-colors duration-200 ${
                    selectedDeck === deck.id ? 'bg-accent text-white' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedDeck(deck.id)}
                >
                  <div className="flex justify-between items-center">
                    <span>{deck.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDeck(deck.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No decks created yet. Create your first deck!</p>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-heading font-bold mb-4">Deck Details</h2>
          {selectedDeck ? (
            (() => {
              const deck = decks.find(d => d.id === selectedDeck)
              if (!deck) return null
              const stats = getDeckStats(deck.id)
              return (
                <div>
                  <h3 className="text-xl font-semibold mb-2">{deck.name}</h3>
                  <p>Colors: {deck.colors.join(', ')}</p>
                  <p>Cards: {deck.cards.length}</p>
                  <h4 className="text-lg font-semibold mt-4 mb-2">Match Stats</h4>
                  <p>Wins: {stats.wins}</p>
                  <p>Losses: {stats.losses}</p>
                  <p>Draws: {stats.draws}</p>
                </div>
              )
            })()
          ) : (
            <p className="text-gray-500 italic">Select a deck to view details</p>
          )}
        </div>
      </div>
      <DeckBuilderSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  )
}

export default DeckManager

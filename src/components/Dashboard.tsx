import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Deck, Match } from '../store/decksSlice'
import QuickMatchLogger from './QuickMatchLogger'

function Dashboard() {
  const decks = useSelector((state: RootState) => state.decks.decks)
  const matches = useSelector((state: RootState) => state.decks.matches)

  const getDeckName = (deckId: string): string => {
    const deck = decks.find((d: Deck) => d.id === deckId)
    return deck ? deck.name : 'Unknown Deck'
  }

  // Calculate statistics
  const totalDecks = decks.length
  const totalMatches = matches.length
  const winRate = totalMatches > 0
    ? ((matches.filter(m => m.result === 'win').length / totalMatches) * 100).toFixed(1)
    : '0.0'

  const favoriteDeck = decks.reduce((prev, current) => {
    const prevMatches = matches.filter(m => m.deckId === prev.id).length
    const currentMatches = matches.filter(m => m.deckId === current.id).length
    return currentMatches > prevMatches ? current : prev
  }, decks[0])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-heading font-bold">Welcome to Lorcana Tracker</h1>
      
      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Decks" value={totalDecks} />
        <StatCard title="Total Matches" value={totalMatches} />
        <StatCard title="Win Rate" value={`${winRate}%`} />
        <StatCard title="Favorite Deck" value={favoriteDeck ? favoriteDeck.name : 'N/A'} />
      </div>

      {/* Quick Match Logger */}
      <QuickMatchLogger />

      {/* Existing content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-heading font-bold mb-4">Your Decks</h2>
          {decks.length > 0 ? (
            <ul className="space-y-2">
              {decks.map((deck: Deck) => (
                <li key={deck.id} className="flex justify-between items-center">
                  <span>{deck.name}</span>
                  <span className="text-gray-500">{deck.cards.length} cards</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No decks created yet. Create your first deck!</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-heading font-bold mb-4">Recent Matches</h2>
          {matches.length > 0 ? (
            <ul className="space-y-2">
              {matches.slice(-5).reverse().map((match: Match) => (
                <li key={match.id} className="flex items-center">
                  <div className={`w-2 h-12 mr-2 ${match.onPlay ? 'bg-blue-500' : 'bg-green-500'}`}>
                    <span className="writing-mode-vertical text-xs text-white font-bold px-1">
                      {match.onPlay ? 'PLAY' : 'DRAW'}
                    </span>
                  </div>
                  <div className="flex-grow flex justify-between items-center">
                    <div>
                      <span className="font-semibold">{getDeckName(match.deckId)}</span>
                      <span className="text-gray-500 mx-2">vs</span>
                      <span className="text-gray-500">{match.opponentColors.join(', ')}</span>
                    </div>
                    <span className={`font-semibold ${
                      match.result === 'win' ? 'text-green-500' : 
                      match.result === 'loss' ? 'text-red-500' : 'text-yellow-500'
                    }`}>
                      {match.result.charAt(0).toUpperCase() + match.result.slice(1)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No matches logged yet. Log your first match!</p>
          )}
        </div>
      </div>
    </div>
  )
}

// Helper component for stat cards
function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-primary">{value}</p>
    </div>
  )
}

export default Dashboard

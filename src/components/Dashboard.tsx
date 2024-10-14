import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import DeckBuilderSidebar from './DeckBuilderSidebar'
import MatchLogger from './MatchLogger'
import { Match as StoreMatch, Deck } from '../store/decksSlice'

// Remove or comment out this interface
// interface Match {
//   id: string
//   deckId: string
//   date: string
//   opponent: string
//   result: 'win' | 'loss' | 'draw'
// }

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMatchLoggerOpen, setIsMatchLoggerOpen] = useState(false)
  
  const decks = useSelector((state: RootState) => state.decks.decks)
  const matches = useSelector((state: RootState) => state.decks.matches)

  const handleCreateNewDeck = () => {
    setIsSidebarOpen(true)
  }

  const handleLogNewMatch = () => {
    setIsMatchLoggerOpen(true)
  }

  const handleCreateDeck = (newDeck: { name: string; colors: string[]; cards: { id: string; quantity: number }[] }) => {
    console.log('New deck created:', newDeck)
    setIsSidebarOpen(false)
  }

  const getDeckName = (deckId: string) => {
    const deck = decks.find(d => d.id === deckId)
    return deck ? deck.name : 'Unknown Deck'
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-heading font-bold">Welcome to Lorcana Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Decks" value={decks.length} />
        <StatCard title="Total Matches" value={matches.length} />
        <StatCard title="Win Rate" value={`${calculateWinRate(matches)}%`} />
        <StatCard title="Favorite Deck" value={getFavoriteDeck(decks, matches)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-heading font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <QuickActionButton onClick={handleCreateNewDeck} label="Create New Deck" />
            <QuickActionButton onClick={handleLogNewMatch} label="Log New Match" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-heading font-semibold mb-4">Recent Matches</h2>
          {matches.length > 0 ? (
            <ul className="space-y-2">
              {matches.slice(-5).reverse().map((match) => (
                <li key={match.id} className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold">{getDeckName(match.deckId)}</span>
                    <span className="text-gray-500 mx-2">vs</span>
                    <span>{match.opponentColors.join('/')}</span>
                  </div>
                  <div>
                    <span className="mr-2">{match.playerLore} - {match.opponentLore}</span>
                    <span className={`font-semibold ${getResultColor(match.result)}`}>
                      {match.result.toUpperCase()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No recent matches</p>
          )}
          <Link to="/matches" className="text-primary hover:underline mt-4 inline-block">
            View all matches
          </Link>
        </div>
      </div>

      <DeckBuilderSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onCreateDeck={handleCreateDeck}
      />
      {isMatchLoggerOpen && <MatchLogger onClose={() => setIsMatchLoggerOpen(false)} />}
    </div>
  )
}

function calculateWinRate(matches: StoreMatch[]): string {
  const wins = matches.filter(m => m.result === 'win').length
  return matches.length > 0 ? ((wins / matches.length) * 100).toFixed(1) : '0.0'
}

function getFavoriteDeck(decks: Deck[], matches: StoreMatch[]): string {
  if (decks.length === 0 || matches.length === 0) return 'N/A'
  const deckUsage = matches.reduce((acc, match) => {
    acc[match.deckId] = (acc[match.deckId] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const favoriteDeckId = Object.entries(deckUsage).sort((a, b) => b[1] - a[1])[0][0]
  return decks.find(d => d.id === favoriteDeckId)?.name || 'N/A'
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

function QuickActionButton({ to, label, onClick }: { to?: string; label: string; onClick?: () => void }) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="block w-full text-center bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors duration-200"
      >
        {label}
      </button>
    )
  }
  return (
    <Link
      to={to || '#'}
      className="block w-full text-center bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors duration-200"
    >
      {label}
    </Link>
  )
}

function getResultColor(result: string) {
  switch (result) {
    case 'win':
      return 'text-green-500'
    case 'loss':
      return 'text-red-500'
    default:
      return 'text-yellow-500'
  }
}

export default Dashboard

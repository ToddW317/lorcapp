import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Deck, Match } from '../store/decksSlice'

function MatchHistory() {
  const matches = useSelector((state: RootState) => state.decks.matches)
  const decks = useSelector((state: RootState) => state.decks.decks)

  const getDeckName = (deckId: string): string => {
    const deck = decks.find((d: Deck) => d.id === deckId)
    return deck ? deck.name : 'Unknown Deck'
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-heading font-bold">Match History</h1>
      {matches.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Play/Draw</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deck</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opponent Colors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lore</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {matches.slice().reverse().map((match: Match) => (
                <tr key={match.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`w-16 h-8 flex items-center justify-center text-white font-bold ${match.onPlay ? 'bg-blue-500' : 'bg-green-500'}`}>
                      {match.onPlay ? 'PLAY' : 'DRAW'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(match.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getDeckName(match.deckId)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{match.opponentColors.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {match.playerLore} - {match.opponentLore}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      match.result === 'win' ? 'bg-green-100 text-green-800' : 
                      match.result === 'loss' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {match.result.charAt(0).toUpperCase() + match.result.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 italic">No matches logged yet. Start playing and logging your matches!</p>
      )}
    </div>
  )
}

export default MatchHistory

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Deck, Match } from '../store/decksSlice'

function MatchHistory() {
  const matches = useSelector((state: RootState) => state.decks.matches)
  const decks = useSelector((state: RootState) => state.decks.decks)

  const getDeckName = (deckId: string): string => {
    const deck = decks.find(d => d.id === deckId)
    return deck ? deck.name : 'Unknown Deck'
  }

  const getResultColor = (result: string): string => {
    switch (result) {
      case 'win':
        return 'text-green-500'
      case 'loss':
        return 'text-red-500'
      default:
        return 'text-yellow-500'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-6">Match History</h1>
      {matches.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deck Used</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opponent Colors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lore Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {matches.map((match) => (
                <tr key={match.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(match.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getDeckName(match.deckId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {match.opponentColors.join(', ')}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap font-medium ${getResultColor(match.result)}`}>
                    {match.result.toUpperCase()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {match.playerLore} - {match.opponentLore}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 italic">No matches recorded yet.</p>
      )}
    </div>
  )
}

export default MatchHistory

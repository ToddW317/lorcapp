import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMatch } from '../store/decksSlice';
import { RootState } from '../store';

interface MatchLoggerProps {
  onClose: () => void;
}

const inkColors = [
  { name: 'amber', svg: '/images/inks/amber-ink.svg', bgColor: 'bg-yellow-100' },
  { name: 'amethyst', svg: '/images/inks/amethyst-ink.svg', bgColor: 'bg-purple-100' },
  { name: 'emerald', svg: '/images/inks/emerald-ink.svg', bgColor: 'bg-green-100' },
  { name: 'ruby', svg: '/images/inks/ruby-ink.svg', bgColor: 'bg-red-100' },
  { name: 'sapphire', svg: '/images/inks/sapphire-ink.svg', bgColor: 'bg-blue-100' },
  { name: 'steel', svg: '/images/inks/steel-ink.svg', bgColor: 'bg-gray-100' },
];

function MatchLogger({ onClose }: MatchLoggerProps) {
  const dispatch = useDispatch();
  const decks = useSelector((state: RootState) => state.decks.decks);
  const [selectedDeckId, setSelectedDeckId] = useState('');
  const [opponentColors, setOpponentColors] = useState<string[]>([]);
  const [result, setResult] = useState<'win' | 'loss' | 'draw'>('win');
  const [playerLore, setPlayerLore] = useState(0);
  const [opponentLore, setOpponentLore] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addMatch({
      deckId: selectedDeckId,
      opponentColors,
      result,
      date: new Date().toISOString(),
      playerLore,
      opponentLore,
    }));
    onClose();
  };

  const handleColorToggle = (color: string) => {
    setOpponentColors(prev => {
      if (prev.includes(color)) {
        return prev.filter(c => c !== color);
      } else {
        if (prev.length < 2) {
          return [...prev, color];
        } else {
          return [prev[1], color];
        }
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-heading font-bold">Log Match</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="deck" className="block mb-1 font-semibold">Your Deck</label>
            <select
              id="deck"
              value={selectedDeckId}
              onChange={(e) => setSelectedDeckId(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select a deck</option>
              {decks.map(deck => (
                <option key={deck.id} value={deck.id}>{deck.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Opponent's Colors (Select up to 2)</label>
            <div className="grid grid-cols-3 gap-4">
              {inkColors.map(color => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => handleColorToggle(color.name)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${color.bgColor} ${
                    opponentColors.includes(color.name) 
                      ? 'ring-4 ring-primary scale-105' 
                      : 'hover:scale-105'
                  }`}
                  disabled={opponentColors.length === 2 && !opponentColors.includes(color.name)}
                >
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img src={color.svg} alt={color.name} className="max-w-full max-h-full" />
                  </div>
                  <span className="mt-1 text-xs font-medium text-center">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="playerLore" className="block mb-1 font-semibold">Your Lore</label>
              <input
                type="number"
                id="playerLore"
                value={playerLore}
                onChange={(e) => setPlayerLore(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
                required
                min="0"
                max="20"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="opponentLore" className="block mb-1 font-semibold">Opponent's Lore</label>
              <input
                type="number"
                id="opponentLore"
                value={opponentLore}
                onChange={(e) => setOpponentLore(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
                required
                min="0"
                max="20"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Result</label>
            <div className="flex space-x-2">
              {['win', 'loss', 'draw'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setResult(r as 'win' | 'loss' | 'draw')}
                  className={`flex-1 px-4 py-2 rounded-md ${result === r ? 'bg-primary text-white' : 'bg-gray-200'}`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200"
          >
            Log Match
          </button>
        </form>
      </div>
    </div>
  );
}

export default MatchLogger;

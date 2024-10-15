import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addMatch, Deck } from '../store/decksSlice';

const inkColors = [
  { name: 'amber', svg: '/images/inks/amber-ink.svg', bgColor: 'bg-yellow-100' },
  { name: 'amethyst', svg: '/images/inks/amethyst-ink.svg', bgColor: 'bg-purple-100' },
  { name: 'emerald', svg: '/images/inks/emerald-ink.svg', bgColor: 'bg-green-100' },
  { name: 'ruby', svg: '/images/inks/ruby-ink.svg', bgColor: 'bg-red-100' },
  { name: 'sapphire', svg: '/images/inks/sapphire-ink.svg', bgColor: 'bg-blue-100' },
  { name: 'steel', svg: '/images/inks/steel-ink.svg', bgColor: 'bg-gray-100' },
];

function QuickMatchLogger() {
  const dispatch = useDispatch();
  const decks = useSelector((state: RootState) => state.decks.decks);

  const [selectedDeck, setSelectedDeck] = useState('');
  const [opponentColors, setOpponentColors] = useState<string[]>([]);
  const [playerLore, setPlayerLore] = useState(0);
  const [opponentLore, setOpponentLore] = useState(0);
  const [onPlay, setOnPlay] = useState<boolean | null>(null);
  const [result, setResult] = useState<'win' | 'loss' | 'draw' | ''>('');

  const handleColorToggle = (color: string) => {
    setOpponentColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDeck && onPlay !== null && result) {
      dispatch(addMatch({
        deckId: selectedDeck,
        opponentColors,
        playerLore,
        opponentLore,
        onPlay,
        result,
        date: new Date().toISOString(),
      }));
      // Reset form
      setSelectedDeck('');
      setOpponentColors([]);
      setPlayerLore(0);
      setOpponentLore(0);
      setOnPlay(null);
      setResult('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-heading font-bold mb-4">Quick Match Log</h2>
      
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Select Deck</label>
        <select 
          value={selectedDeck} 
          onChange={(e) => setSelectedDeck(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a deck</option>
          {decks.map((deck: Deck) => (
            <option key={deck.id} value={deck.id}>{deck.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Opponent's Colors</label>
        <div className="flex space-x-2">
          {inkColors.map(color => (
            <button
              key={color.name}
              type="button"
              onClick={() => handleColorToggle(color.name)}
              className={`w-8 h-8 rounded-full ${color.bgColor} ${opponentColors.includes(color.name) ? 'ring-2 ring-primary' : ''}`}
            >
              <img src={color.svg} alt={color.name} className="w-full h-full" />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex space-x-4">
        <div>
          <label className="block mb-2 font-semibold">Your Lore</label>
          <input 
            type="number" 
            value={playerLore} 
            onChange={(e) => setPlayerLore(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Opponent's Lore</label>
          <input 
            type="number" 
            value={opponentLore} 
            onChange={(e) => setOpponentLore(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">On the Play or Draw?</label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setOnPlay(true)}
            className={`px-4 py-2 rounded ${onPlay === true ? 'bg-primary text-white' : 'bg-gray-200'}`}
          >
            Play
          </button>
          <button
            type="button"
            onClick={() => setOnPlay(false)}
            className={`px-4 py-2 rounded ${onPlay === false ? 'bg-primary text-white' : 'bg-gray-200'}`}
          >
            Draw
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Result</label>
        <div className="flex space-x-4">
          {['win', 'loss', 'draw'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setResult(r as 'win' | 'loss' | 'draw')}
              className={`px-4 py-2 rounded ${result === r ? 'bg-primary text-white' : 'bg-gray-200'}`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <button 
        type="submit" 
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors"
      >
        Log Match
      </button>
    </form>
  );
}

export default QuickMatchLogger;

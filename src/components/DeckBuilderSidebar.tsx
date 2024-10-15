import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addDeck } from '../store/decksSlice'

interface DeckBuilderSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const colors = [
  { name: 'Amber', value: 'amber' },
  { name: 'Amethyst', value: 'amethyst' },
  { name: 'Emerald', value: 'emerald' },
  { name: 'Ruby', value: 'ruby' },
  { name: 'Sapphire', value: 'sapphire' },
  { name: 'Steel', value: 'steel' },
]

function DeckBuilderSidebar({ isOpen, onClose }: DeckBuilderSidebarProps) {
  const dispatch = useDispatch()
  const [deckName, setDeckName] = useState('')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedCards, setSelectedCards] = useState<{ id: string; name: string; quantity: number; cost: number; color: string; type: string; rarity: string }[]>([])

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    )
  }

  const handleCreateDeck = () => {
    if (deckName && selectedColors.length > 0) {
      dispatch(addDeck({
        name: deckName,
        colors: selectedColors,
        cards: selectedCards,
      }))
      onClose()
    }
  }

  return (
    <div className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-200 ease-in-out overflow-y-auto`}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Create New Deck</h2>
        
        <div className="mb-6">
          <label htmlFor="deckName" className="block text-sm font-medium text-gray-700 mb-2">
            Deck Name
          </label>
          <input
            type="text"
            id="deckName"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
            placeholder="Enter deck name"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Select Colors</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map(color => (
              <button
                key={color.value}
                onClick={() => handleColorToggle(color.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedColors.includes(color.value)
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {color.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Cards</h3>
          {selectedCards.length > 0 ? (
            <ul className="space-y-2">
              {selectedCards.map(card => (
                <li key={card.id} className="flex justify-between items-center">
                  <span>{card.name}</span>
                  <span className="text-gray-500">x{card.quantity}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No cards selected yet</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateDeck}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            disabled={!deckName || selectedColors.length === 0}
          >
            Create Deck
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeckBuilderSidebar

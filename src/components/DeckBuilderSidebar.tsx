import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addDeck } from '../store/decksSlice'

interface DeckBuilderSidebarProps {
  isOpen: boolean
  onClose: () => void
  onCreateDeck?: (newDeck: { name: string; colors: string[]; cards: { id: string; quantity: number }[] }) => void
}

const inkColors = [
  { name: 'amber', svg: '/images/inks/amber-ink.svg', bgColor: 'bg-yellow-100' },
  { name: 'amethyst', svg: '/images/inks/amethyst-ink.svg', bgColor: 'bg-purple-100' },
  { name: 'emerald', svg: '/images/inks/emerald-ink.svg', bgColor: 'bg-green-100' },
  { name: 'ruby', svg: '/images/inks/ruby-ink.svg', bgColor: 'bg-red-100' },
  { name: 'sapphire', svg: '/images/inks/sapphire-ink.svg', bgColor: 'bg-blue-100' },
  { name: 'steel', svg: '/images/inks/steel-ink.svg', bgColor: 'bg-gray-100' },
]

function DeckBuilderSidebar({ isOpen, onClose, onCreateDeck }: DeckBuilderSidebarProps) {
  const [deckName, setDeckName] = useState('')
  const [deckColors, setDeckColors] = useState<string[]>([])
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newDeck = { 
      name: deckName, 
      colors: deckColors, 
      cards: [] // Initialize with empty array, you'll implement card selection later
    }
    dispatch(addDeck(newDeck))
    if (onCreateDeck) {
      onCreateDeck(newDeck)
    }
    onClose()
    // Reset form
    setDeckName('')
    setDeckColors([])
  }

  const handleColorToggle = (color: string) => {
    setDeckColors(prev => {
      if (prev.includes(color)) {
        return prev.filter(c => c !== color)
      } else {
        if (prev.length < 2) {
          return [...prev, color]
        } else {
          return [prev[1], color]
        }
      }
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-heading font-bold">Create New Deck</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="deckName" className="block mb-1 font-semibold">Deck Name</label>
            <input
              type="text"
              id="deckName"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Deck Colors (Select up to 2)</label>
            <div className="grid grid-cols-3 gap-4">
              {inkColors.map(color => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => handleColorToggle(color.name)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${color.bgColor} ${
                    deckColors.includes(color.name) 
                      ? 'ring-4 ring-primary scale-105' 
                      : 'hover:scale-105'
                  }`}
                  disabled={deckColors.length === 2 && !deckColors.includes(color.name)}
                >
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img src={color.svg} alt={color.name} className="max-w-full max-h-full" />
                  </div>
                  <span className="mt-1 text-xs font-medium text-center">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200"
            disabled={deckName.trim() === '' || deckColors.length === 0}
          >
            Create Deck
          </button>
        </form>
      </div>
    </div>
  )
}

export default DeckBuilderSidebar

import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createDeck } from '../api/decks'

interface CreateDeckModalProps {
  isOpen: boolean
  onClose: () => void
}

interface DeckData {
  name: string
  colors: string[]
  cards: { id: string; quantity: number }[]
  inkwell: number
}

function CreateDeckModal({ isOpen, onClose }: CreateDeckModalProps) {
  const [deckName, setDeckName] = useState('')
  const [deckColors, setDeckColors] = useState<string[]>([])
  const [inkwell, setInkwell] = useState(0)
  const queryClient = useQueryClient()

  const createDeckMutation = useMutation<unknown, Error, DeckData>({
    mutationFn: createDeck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['decks'] })
      onClose()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createDeckMutation.mutate({
      name: deckName,
      colors: deckColors,
      cards: [], // Initialize with empty array, you'll need to implement card selection
      inkwell: inkwell
    })
  }

  const handleColorToggle = (color: string) => {
    setDeckColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-heading font-bold mb-4">Create New Deck</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="deckName" className="block mb-1">Deck Name</label>
            <input
              type="text"
              id="deckName"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Deck Colors</label>
            <div className="flex flex-wrap gap-2">
              {['amber', 'amethyst', 'emerald', 'ruby', 'sapphire', 'steel'].map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorToggle(color)}
                  className={`px-3 py-1 rounded-full ${
                    deckColors.includes(color) ? 'bg-primary text-white' : 'bg-gray-200'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="inkwell" className="block mb-1">Inkwell</label>
            <input
              type="number"
              id="inkwell"
              value={inkwell}
              onChange={(e) => setInkwell(Number(e.target.value))}
              className="w-full p-2 border rounded-md"
              min="0"
              required
            />
          </div>
          {/* Add card selection component here */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              Create Deck
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateDeckModal

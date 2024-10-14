import axios from 'axios'
import { Card } from '../types/card'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api'; // Make sure this matches your server port

export async function fetchCards(searchTerm: string = ''): Promise<{ cards: Card[], total: number }> {
  try {
    console.log('Fetching cards with search term:', searchTerm)
    const response = await axios.get(`${API_URL}/cards`, {
      params: { 
        search: searchTerm
      },
      headers: {
        'Accept': 'application/json'
      }
    })
    
    if (response.data.error) {
      throw new Error(response.data.error)
    }
    
    const cards: Card[] = Array.isArray(response.data) 
      ? response.data.map(mapApiCardToCardType)
      : [mapApiCardToCardType(response.data)]
    
    return {
      cards,
      total: cards.length
    }
  } catch (error) {
    console.error('Error fetching cards:', error)
    throw error
  }
}

function mapApiCardToCardType(apiCard: any): Card {
  return {
    id: apiCard.id || `${apiCard.name}-${apiCard.number}`,
    name: apiCard.name || '',
    type: apiCard.type || '',
    subtype: apiCard.subtype || '',
    inkwell: apiCard.inkwell || 0,
    strength: apiCard.strength,
    willpower: apiCard.willpower,
    lore: apiCard.lore,
    image: apiCard.image || '',
    text: apiCard.text,
    flavor: apiCard.flavor,
    color: apiCard.color || '',
    rarity: apiCard.rarity || '',
    set: apiCard.set || '',
    number: apiCard.number || '',
    artist: apiCard.artist || ''
  }
}

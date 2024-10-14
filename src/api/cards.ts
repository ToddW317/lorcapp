import axios from 'axios'

const API_URL = 'https://api.lorcast.com/v0' // Changed back to v0

export interface Card {
  id: string
  name: string
  cost: number
  inkwell: number
  type: string
  subtype: string
  text: string
  flavor: string
  strength: number
  willpower: number
  lore: number
  rarity: string
  number: string
  artist: string
  set: string
  image: string
  tcgplayer_id: number
  tcgplayer_url: string
  tcgplayer_price: {
    low: number
    mid: number
    high: number
    market: number
  }
}

export async function fetchCards(searchTerm: string = '', page: number = 1, pageSize: number = 20): Promise<{ cards: Card[], total: number }> {
  try {
    const response = await axios.get(`${API_URL}/cards/search`, {
      params: { 
        q: searchTerm,
        page,
        pageSize
      },
      headers: {
        'Accept': 'application/json'
      }
    })
    return {
      cards: response.data.data,
      total: response.data.total
    }
  } catch (error) {
    console.error('Error fetching cards:', error)
    throw error
  }
}

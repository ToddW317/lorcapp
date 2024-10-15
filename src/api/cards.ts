import axios from 'axios'
import { Card } from '../types/card'

const API_URL = 'http://localhost:3001/api'

export async function fetchCards(): Promise<Card[]> {
  try {
    const response = await axios.get(`${API_URL}/cards`)
    return response.data.map(mapApiCardToCardType)
  } catch (error) {
    console.error('Error fetching cards:', error)
    throw error
  }
}

function mapApiCardToCardType(apiCard: any): Card {
  return {
    id: apiCard.Unique_ID || `${apiCard.Name}-${apiCard.Card_Num}`,
    name: apiCard.Name || '',
    type: apiCard.Type || '',
    subtype: apiCard.Classifications || '',
    inkwell: apiCard.Inkable ? 1 : 0,
    strength: apiCard.Strength || null,
    willpower: apiCard.Willpower || null,
    lore: apiCard.Lore || null,
    image: apiCard.Image || '',
    text: apiCard.Body_Text || '',
    flavor: apiCard.Flavor_Text || '',
    color: apiCard.Color || '',
    rarity: apiCard.Rarity || '',
    set: apiCard.Set_Name || '',
    number: apiCard.Card_Num || '',
    artist: apiCard.Artist || ''
  }
}


import axios from 'axios';
import { Card } from '../types/card'

const API_URL = process.env.REACT_APP_API_URL || '/api'

interface CardData {
  lastUpdated: string;
  cards: Card[];
}

export async function fetchCards(): Promise<Card[]> {
  console.log('Fetching cards from:', `${API_URL}/cards`);
  
  const storedData = localStorage.getItem('lorcanaCards');
  const now = new Date();

  if (storedData) {
    console.log('Found stored card data');
    const parsedData: CardData = JSON.parse(storedData);
    const lastUpdated = new Date(parsedData.lastUpdated);
    
    if (now.getTime() - lastUpdated.getTime() < 24 * 60 * 60 * 1000) {
      console.log('Using stored card data');
      return parsedData.cards;
    }
  }

  try {
    console.log('Fetching fresh card data');
    const response = await axios.get<Card[]>(`${API_URL}/cards`);
    console.log('API response:', response.status, response.statusText);
    console.log('API data length:', response.data.length);

    const cards = response.data.map(card => ({
      ...card,
      Set_Name: card.Set_Name, // Map Set_Name to set
    }));

    if (!Array.isArray(cards)) {
      throw new Error('Invalid data structure received from API');
    }

    const newData: CardData = {
      lastUpdated: now.toISOString(),
      cards: cards
    };

    localStorage.setItem('lorcanaCards', JSON.stringify(newData));
    
    console.log(`Fetched ${cards.length} cards`);
    return cards;
  } catch (error) {
    console.error('Failed to fetch updated card data:', error);
    
    if (storedData) {
      console.log('Using stored card data after fetch failure');
      const parsedData: CardData = JSON.parse(storedData);
      return parsedData.cards;
    }
    
    console.log('No stored data available, returning empty array');
    return [];
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
    Set_Name: apiCard.Set_Name || '',
    number: apiCard.Card_Num || '',
    artist: apiCard.Artist || ''
  }
}

import axios from 'axios'

export async function fetchDecks() {
  const response = await axios.get('/v0/decks')
  return response.data
}

export async function createDeck(deckData: { 
  name: string; 
  colors: string[]; 
  cards: { id: string; quantity: number }[];
}) {
  const response = await axios.post('/v0/decks', deckData)
  return response.data
}

import axios from 'axios'

const API_URL = 'https://api.lorcast.com/v0'

export async function fetchRecentMatches() {
  const response = await axios.get(`${API_URL}/matches/recent`)
  return response.data
}

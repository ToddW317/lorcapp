const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_URL = 'https://api.lorcana-api.com';

app.use(cors());

app.get('/api/cards', async (req, res) => {
  try {
    console.log('Requesting cards from Lorcana API...')
    console.log('Query params:', req.query)

    let endpoint = '/cards/all'
    let params = {}

    if (req.query.search) {
      endpoint = '/cards/fetch'
      params = { name: req.query.search }
    }

    const response = await axios.get(`${API_URL}${endpoint}`, {
      params: params,
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log('Lorcana API response status:', response.status);
    console.log('Lorcana API response data:', response.data);

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cards:', error.message);
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
      console.error('Error headers:', error.response.headers);
    }
    res.status(500).json({ error: 'An error occurred while fetching cards', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API URL: ${API_URL}`);
});

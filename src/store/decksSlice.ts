import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Deck {
  id: string;
  name: string;
  colors: string[];
  cards: {
    id: string;
    name: string;
    quantity: number;
    cost: number;
    color: string;
    type: string;
    rarity: string;
  }[];
  matchStats: {
    wins: number;
    losses: number;
    draws: number;
  };
}

export interface Match {
  id: string;
  deckId: string;
  opponentColors: string[];
  result: 'win' | 'loss' | 'draw';
  date: string;
  playerLore: number;
  opponentLore: number;
  onPlay: boolean;
}

interface DecksState {
  decks: Deck[];
  matches: Match[];
}

const initialState: DecksState = {
  decks: [],
  matches: [],
};

export const decksSlice = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    addDeck: (state, action: PayloadAction<Omit<Deck, 'id' | 'matchStats'>>) => {
      const newDeck: Deck = {
        ...action.payload,
        id: Date.now().toString(),
        matchStats: { wins: 0, losses: 0, draws: 0 },
      };
      state.decks.push(newDeck);
    },
    updateDeck: (state, action: PayloadAction<Deck>) => {
      const index = state.decks.findIndex(deck => deck.id === action.payload.id);
      if (index !== -1) {
        state.decks[index] = action.payload;
      }
    },
    deleteDeck: (state, action: PayloadAction<string>) => {
      state.decks = state.decks.filter(deck => deck.id !== action.payload);
    },
    addMatch: (state, action: PayloadAction<Omit<Match, 'id'>>) => {
      const newMatch: Match = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.matches.push(newMatch);
      
      const deck = state.decks.find(d => d.id === newMatch.deckId);
      if (deck) {
        if (newMatch.result === 'win') deck.matchStats.wins++;
        else if (newMatch.result === 'loss') deck.matchStats.losses++;
        else if (newMatch.result === 'draw') deck.matchStats.draws++;
      }
    },
    addCardToDeck: (state, action: PayloadAction<{ deckId: string; cardId: string; quantity: number }>) => {
      const { deckId, cardId, quantity } = action.payload;
      const deck = state.decks.find(d => d.id === deckId);
      if (deck) {
        const existingCard = deck.cards.find(c => c.id === cardId);
        if (existingCard) {
          existingCard.quantity += quantity;
        } else {
          deck.cards.push({ id: cardId, quantity });
        }
      }
    },
  },
});

export const { addDeck, updateDeck, deleteDeck, addMatch, addCardToDeck } = decksSlice.actions;

export default decksSlice.reducer;

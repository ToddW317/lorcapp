import { configureStore } from '@reduxjs/toolkit';
import decksReducer from './decksSlice';

export const store = configureStore({
  reducer: {
    decks: decksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

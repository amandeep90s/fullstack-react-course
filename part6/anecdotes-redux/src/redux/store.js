import { configureStore } from '@reduxjs/toolkit';
import anecdoteSlice from './features/anecdoteSlice';

const store = configureStore({
  reducer: {
    [anecdoteSlice.name]: anecdoteSlice.reducer,
  },
});

export default store;

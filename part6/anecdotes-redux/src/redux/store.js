import { configureStore } from '@reduxjs/toolkit';
import anecdoteSlice from './features/anecdoteSlice';
import filterSlice from './features/filterSlice';

const store = configureStore({
  reducer: {
    [anecdoteSlice.name]: anecdoteSlice.reducer,
    [filterSlice.name]: filterSlice.reducer,
  },
});

export default store;

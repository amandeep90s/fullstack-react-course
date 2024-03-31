import { configureStore } from '@reduxjs/toolkit';
import anecdoteSlice from './features/anecdoteSlice';
import filterSlice from './features/filterSlice';
import notificationSlice from './features/notificationSlice';

const store = configureStore({
  reducer: {
    [anecdoteSlice.name]: anecdoteSlice.reducer,
    [filterSlice.name]: filterSlice.reducer,
    [notificationSlice.name]: notificationSlice.reducer,
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './features/counterSlice';

const store = configureStore({
  reducer: {
    [counterSlice.name]: counterSlice.reducer,
  },
});

export default store;

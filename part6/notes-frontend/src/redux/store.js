import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './features/filterSlice';
import notesSlice from './features/notesSlice';

const store = configureStore({
  reducer: {
    [notesSlice.name]: notesSlice.reducer,
    [filterSlice.name]: filterSlice.reducer,
  },
});

export default store;

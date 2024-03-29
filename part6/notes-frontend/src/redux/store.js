import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './features/notesSlice';

const store = configureStore({
  reducer: {
    notes: noteReducer,
  },
});

export default store;

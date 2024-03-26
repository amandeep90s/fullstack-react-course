import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes = [...state.notes, action.payload];
    },
    toggleImportance: (state, action) => {
      const id = action.payload.id;
      const noteToChange = state.notes.find((item) => item.id === id);
      const changednote = {
        ...noteToChange,
        important: !noteToChange.important,
      };

      state.notes = state.notes.map((note) =>
        note.id !== id ? note : changednote
      );

      return state;
    },
  },
});

export const { addNote, toggleImportance } = notesSlice.actions;

export default notesSlice.reducer;

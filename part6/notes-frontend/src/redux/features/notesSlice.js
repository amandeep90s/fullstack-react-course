import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.push(action.payload);
    },
    toggleImportance: (state, action) => {
      const id = action.payload.id;
      const noteToChange = state.find((item) => item.id === id);
      const changednote = {
        ...noteToChange,
        important: !noteToChange.important,
      };

      return state.map((note) => (note.id !== id ? note : changednote));
    },
    appendNote: (state, action) => {
      state.push(action.payload);
    },
    setNotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { addNote, toggleImportance, appendNote, setNotes } =
  notesSlice.actions;

export default notesSlice;

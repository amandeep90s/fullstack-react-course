import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
];

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
  },
});

export const { addNote, toggleImportance } = notesSlice.actions;

export default notesSlice;

import { createSlice } from '@reduxjs/toolkit';
import noteService from '../../services/notes';

const initialState = [];

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
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

export const { toggleImportance, appendNote, setNotes } = notesSlice.actions;

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const addNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNote(content);
    dispatch(appendNote(newNote));
  };
};

export default notesSlice;

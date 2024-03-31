import React from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../redux/features/notesSlice';
import noteService from '../services/notes';

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const AddNote = () => {
  const dispatch = useDispatch();

  const addNewNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';

    const newNote = await noteService.createNote(content);
    dispatch(addNote(newNote));
  };

  return (
    <form onSubmit={addNewNote}>
      <input type='text' name='note' />
      <button type='submit'>Add note</button>
    </form>
  );
};

export default AddNote;

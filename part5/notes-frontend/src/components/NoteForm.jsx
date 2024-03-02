import { useState } from 'react';
import PropTypes from 'prop-types';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');

  const addNote = (event) => {
    event.preventDefault();

    createNote({
      content: newNote,
      important: true,
    });
    setNewNote('');
  };

  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input
          type='text'
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
          placeholder='write note content here'
          id='note-input'
        />

        <button type='submit'>save</button>
      </form>
    </div>
  );
};

NoteForm.propTypes = {
  createNote: PropTypes.func.isRequired,
};

export default NoteForm;

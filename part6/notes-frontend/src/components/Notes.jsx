import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { toggleImportance } from '../redux/features/notesSlice';

const Note = ({ note, handleClick }) => {
  return (
    <li>
      {note.content}
      <button type='button' onClick={handleClick}>
        <strong>{note.important ? 'Important' : 'Not Important'}</strong>
      </button>
    </li>
  );
};

Note.propTypes = {
  note: PropTypes.object,
  handleClick: PropTypes.func,
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(({ notes, filter }) => {
    if (filter === 'ALL') {
      return notes;
    }
    return filter === 'IMPORTANT'
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important);
  });

  const toggleNoteImportance = (id) => {
    dispatch(toggleImportance({ id }));
  };

  return (
    <div>
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleClick={() => toggleNoteImportance(note.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Notes;

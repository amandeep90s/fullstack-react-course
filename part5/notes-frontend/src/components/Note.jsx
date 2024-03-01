import PropTypes from 'prop-types';

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make note important' : 'make important';

  return (
    <li className='note'>
      Your awesome note: {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

Note.propTypes = {
  note: PropTypes.object.isRequired,
  toggleImportance: PropTypes.func,
};

export default Note;

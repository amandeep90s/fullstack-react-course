import { useDispatch, useSelector } from 'react-redux';
import { addNote, toggleImportance } from './redux/features/notesSlice';

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const App = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.notes);

  const addNewNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';

    dispatch(
      addNote({
        content,
        important: false,
        id: generateId(),
      })
    );
  };

  const toggleNoteImportance = (id) => {
    dispatch(toggleImportance({ id }));
  };

  return (
    <div>
      <form onSubmit={addNewNote}>
        <input type='text' name='note' />
        <button type='submit'>Add note</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content}
            <button type='button' onClick={() => toggleNoteImportance(note.id)}>
              <strong>{note.important ? 'Important' : 'Not Important'}</strong>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

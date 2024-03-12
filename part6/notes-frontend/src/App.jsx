import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from './redux/features/notesSlice';

const App = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(
      addNote({
        content: 'the app state is in redux store',
        important: true,
        id: Date.now(),
      })
    );
    dispatch(
      addNote({
        content: 'state changes are made with actions',
        important: false,
        id: Date.now(),
      })
    );
  }, [dispatch]);

  return (
    <div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

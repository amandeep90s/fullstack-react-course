import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AddNote from './components/AddNote';
import Filter from './components/Filter';
import Notes from './components/Notes';
import { setNotes } from './redux/features/notesSlice';
import noteService from './services/notes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(setNotes(notes)));
  }, []);

  return (
    <div>
      <AddNote />
      <Filter />
      <Notes />
    </div>
  );
};

export default App;

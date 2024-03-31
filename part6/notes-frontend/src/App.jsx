import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AddNote from './components/AddNote';
import Filter from './components/Filter';
import Notes from './components/Notes';
import { initializeNotes } from './redux/features/notesSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
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

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdostList from './components/AnecdostList';
import AnecdoteForm from './components/AnecdoteForm';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { initializeAnecdotes } from './redux/features/anecdoteSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdostList />
      <AnecdoteForm />
    </div>
  );
};

export default App;

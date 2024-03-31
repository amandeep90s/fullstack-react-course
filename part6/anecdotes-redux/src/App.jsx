import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdostList from './components/AnecdostList';
import AnecdoteForm from './components/AnecdoteForm';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { setAnecdotes } from './redux/features/anecdoteSlice';
import anecdoteService from './services/anecdotes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService.getAll().then((notes) => dispatch(setAnecdotes(notes)));
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

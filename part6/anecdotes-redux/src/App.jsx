import AnecdostList from './components/AnecdostList';
import AnecdoteForm from './components/AnecdoteForm';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
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

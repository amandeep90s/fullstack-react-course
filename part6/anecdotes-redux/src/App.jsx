import AnecdostList from './components/AnecdostList';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdostList />
      <AnecdoteForm />
    </div>
  );
};

export default App;

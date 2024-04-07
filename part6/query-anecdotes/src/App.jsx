import { useQuery } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes } from './requests';

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote');
  };

  const { status, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (status === 'pending') {
    return <div>Loading data...</div>;
  }

  if (status === 'error') {
    return (
      <div>
        {error.message}: Anecdote service not available due to problems in
        server
      </div>
    );
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

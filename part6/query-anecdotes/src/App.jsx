import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import NotificationContext from './NotificationContext';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, updateAnecdote } from './requests';

const App = () => {
  const queryClient = useQueryClient();
  const { notificationDispatch } = useContext(NotificationContext);

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({ type: 'VOTE', payload: anecdote });

    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' });
    }, 5000);
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

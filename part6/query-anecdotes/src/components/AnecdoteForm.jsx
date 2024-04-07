import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import NotificationContext from '../NotificationContext';
import { createAnecdote } from '../requests';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { notificationDispatch } = useContext(NotificationContext);

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      if (newAnecdote.error) {
        notificationDispatch({ type: 'ERROR', payload: newAnecdote });
      } else {
        queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
        notificationDispatch({ type: 'CREATE', payload: newAnecdote });
      }
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, vote: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

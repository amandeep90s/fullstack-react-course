import { useDispatch } from 'react-redux';
import { addAnecdote } from '../redux/features/anecdoteSlice';
import { setNotification } from '../redux/features/notificationSlice';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    const newAnecdote = await anecdoteService.createAnecdote(content);

    dispatch(addAnecdote(newAnecdote));
    dispatch(setNotification(`${newAnecdote.content} is added`));
    event.target.content.value = '';
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='text' name='content' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;

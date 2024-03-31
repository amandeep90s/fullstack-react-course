import { useDispatch } from 'react-redux';
import { addAnecdote, getId } from '../redux/features/anecdoteSlice';
import { setNotification } from '../redux/features/notificationSlice';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const anecdote = {
      content: event.target.content.value,
      id: getId(),
      votes: 0,
    };

    dispatch(addAnecdote(anecdote));
    dispatch(setNotification(`${anecdote.content} is added`));

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

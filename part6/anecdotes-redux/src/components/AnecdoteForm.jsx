import { useDispatch } from 'react-redux';
import { addAnecdote } from '../redux/features/anecdoteSlice';
import { setNotification } from '../redux/features/notificationSlice';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;

    dispatch(addAnecdote(content));
    dispatch(setNotification(`${content} is added`));
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

import { useDispatch, useSelector } from 'react-redux';
import { updateVote } from '../redux/features/anecdoteSlice';
import { setNotification } from '../redux/features/notificationSlice';

const AnecdostList = () => {
  const anecdotes = useSelector((state) => {
    if (!state.filter.trim()) {
      return state.anecdotes;
    }

    return state.anecdotes.filter((item) =>
      item.content.includes(state.filter)
    );
  });
  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(updateVote({ id }));

    dispatch(setNotification(`You voted "${content}"`));
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote.content)}>
          vote
        </button>
      </div>
    </div>
  ));
};

export default AnecdostList;

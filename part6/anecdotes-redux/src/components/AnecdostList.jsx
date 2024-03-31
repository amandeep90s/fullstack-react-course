import { useDispatch, useSelector } from 'react-redux';
import { updateVote } from '../redux/features/anecdoteSlice';

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

  const handleVote = (id) => {
    dispatch(updateVote(id));
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdostList;

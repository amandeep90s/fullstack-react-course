import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../../services/anecdotes';
import { setNotification } from './notificationSlice';

const initialState = [];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    updateVote: (state, action) => {
      const { id } = action.payload;
      const anecdoteToChange = state.find((item) => item.id === id);
      const updatedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };

      state = state.map((item) => (item.id === id ? updatedAnecdote : item));

      setNotification(`You voted ${updatedAnecdote.content}`);

      return state.sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateVote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export default anecdoteSlice;

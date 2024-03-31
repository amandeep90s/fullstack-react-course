import { createSlice } from '@reduxjs/toolkit';
import { setNotification } from './notificationSlice';

const initialState = [];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote: (state, action) => {
      state.push(action.payload);
    },
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
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { addAnecdote, updateVote, setAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice;

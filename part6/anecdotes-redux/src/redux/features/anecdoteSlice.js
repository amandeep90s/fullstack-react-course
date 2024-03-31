import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../../services/anecdotes';
import { setNotification } from './notificationSlice';

const initialState = [];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnecdote: (state, action) => {
      state.push(action.payload);
    },
    setAnecdotes: (state, action) => {
      return action.payload.sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

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
    dispatch(setNotification(`${newAnecdote.content} is added`));
  };
};

// Async thunk for updating votes
export const updateVote = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    const anecdoteToChange = anecdotes.find((item) => item.id === id);
    const updatedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };

    await anecdoteService.updateAnecdote(id, updatedAnecdote);

    const newAnecdotes = anecdotes.map((item) =>
      item.id === id ? updatedAnecdote : item
    );

    setNotification(`You voted ${updatedAnecdote.content}`);

    dispatch(setAnecdotes(newAnecdotes));
    dispatch(setNotification(`You voted '${updatedAnecdote.content}'`));
  };
};

export default anecdoteSlice;

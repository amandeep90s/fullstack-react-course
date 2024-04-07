import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () =>
  axios.get(baseUrl).then((response) => response.data);

export const createAnecdote = (newAnedote) =>
  axios.post(baseUrl, newAnedote).then((response) => response.data);

export const updateAnecdote = (updatedAnecdote) =>
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`)
    .then((response) => response.data);
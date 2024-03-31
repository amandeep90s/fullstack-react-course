import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes';

export const getNotes = () =>
  axios.get(baseUrl).then((response) => response.data);

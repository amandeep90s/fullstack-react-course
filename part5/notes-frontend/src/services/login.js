import axios from 'axios';

const baseUrl = '/api/auth/login';

const login = async (credentials) => {
  const request = await axios.post(baseUrl, credentials);
  return request.data;
};

export default { login };

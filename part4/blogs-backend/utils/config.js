require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const MONGODB_URI =
  NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;
const JWT_TOKEN_AUTH = {
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
};

module.exports = {
  PORT,
  MONGODB_URI,
  NODE_ENV,
  JWT_TOKEN_AUTH,
};

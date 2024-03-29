const config = require('./utils/config');
const cors = require('cors');
const express = require('express');
require('express-async-errors');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const blogsRouter = require('./routes/blogs');
const usersRouter = require('./routes/users');
const testingRouter = require('./routes/testing');

mongoose.set('strictQuery', false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

if (config.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}

// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint);

// handler of requests with result to errors
app.use(middleware.errorHandler);

module.exports = app;

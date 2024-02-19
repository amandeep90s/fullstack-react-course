const User = require('../models/user');
const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' });
  } else if (error.name === 'UnauthorizedError') {
    return response.status(400).json({ error: 'Token is missing' });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'Token missing or invalid' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' });
  }

  next(error);
};

const userExtractor = async (request, response, next) => {
  if (request.auth.id) {
    request.user = await User.findById(request.auth.id);
  }
  next();
};

const validateData = (validationSchema) => async (request, response, next) => {
  try {
    await validationSchema.validate(request.body, { abortEarly: false });
    next();
  } catch (err) {
    return response.status(400).json({ errors: err.errors }); // Send error response
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
  validateData,
};

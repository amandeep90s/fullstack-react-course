const Note = require('../models/note');
const User = require('../models/user');

const clearDB = async (_request, response) => {
  await Note.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
};

module.exports = { clearDB };

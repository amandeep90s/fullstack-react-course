const bcrypt = require('bcrypt');
const User = require('../models/user');

const getUsers = async (req, res) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    important: 1,
  });
  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

const createUser = async (req, res) => {
  const { username, name, password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
};

const updateUser = async (req, res) => {
  const { username, name, password } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is missing' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = {
    username,
    name,
    passwordHash,
  };

  const updatedUser = await User.findByIdAndUpdate(req.params.id, user, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  res.status(200).json(updatedUser);
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

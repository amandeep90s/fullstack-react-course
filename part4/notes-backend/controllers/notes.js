const Note = require('../models/note');

const getNotes = async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
};

const getNote = async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).json({ error: 'Note does not found' });
  }
};

const deleteNote = async (request, response) => {
  await Note.findByIdAndDelete(request.params.id);
  return response.status(204).end();
};

const createNote = async (request, response) => {
  const { content, important } = request.body;

  if (!content) {
    return response.status(400).json({ error: 'Content is missing' });
  }

  const note = new Note({
    content: content,
    important: Boolean(important) || false,
  });

  const savedNote = await note.save();

  response.status(201).json(savedNote);
};

const updateNote = async (request, response) => {
  const { content, important } = request.body;

  if (!content) {
    return response.status(400).json({ error: 'Content is missing' });
  }

  const note = {
    content,
    important: Boolean(important) || false,
  };

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  response.json(updatedNote);
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};

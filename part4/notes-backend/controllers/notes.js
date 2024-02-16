const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).json({ error: 'Note does not found' });
  }
});

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndDelete(request.params.id);
  return response.status(204).end();
});

notesRouter.post('/', async (request, response) => {
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
});

notesRouter.put('/:id', async (request, response) => {
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
});

module.exports = notesRouter;

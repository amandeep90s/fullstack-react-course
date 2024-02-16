const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (request, response, next) => {
  try {
    const notes = await Note.find({});

    response.json(notes);
  } catch (error) {
    next(error);
  }
});

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      return response.json(note);
    }
    response.status(404).json({ error: 'Note does not found' });
  } catch (error) {
    next(error);
  }
});

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    const note = await Note.findByIdAndDelete(request.params.id);

    if (note) {
      return response.status(204).end();
    }
    response.status(404).json({ error: 'Note does not found' });
  } catch (error) {
    next(error);
  }
});

notesRouter.post('/', async (request, response, next) => {
  try {
    const { content, important } = request.body;

    if (!content) {
      return response.status(400).json({ error: 'Content is missing' });
    }

    const note = new Note({
      content: content,
      important: Boolean(important) || false,
    });

    const savedNote = await note.save();

    response.json(savedNote);
  } catch (error) {
    next(error);
  }
});

notesRouter.put('/:id', async (request, response, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;

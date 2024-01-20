const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', (request, response, next) => {
  Note.find({})
    .then((notes) => {
      response.json(notes);
    })
    .catch((error) => next(error));
});

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).json({ error: 'Note does not found' });
      }
    })
    .catch((error) => next(error));
});

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

notesRouter.post('/', (request, response, next) => {
  const { body } = request;

  if (!body.content) {
    return response.status(400).json({ error: 'Content is missing' });
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

notesRouter.put('/:id', (request, response, next) => {
  const { body } = request;

  if (!body.content) {
    return response.status(400).json({ error: 'Content is missing' });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
  };

  Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;

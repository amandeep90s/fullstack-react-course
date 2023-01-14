const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');

const getTokenFrom = (request) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7);
	}
	return null;
};

notesRouter.get('/', async (request, response) => {
	const notes = await Note.find({}).populate('user', {
		username: 1,
		name: 1,
	});
	response.json(notes);
});

notesRouter.post('/', async (request, response) => {
	const body = request.body;
	const token = getTokenFrom(request);
	// @ts-ignore
	const decodedToken = jwt.verify(token, config.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}
	const user = await User.findById(decodedToken.id);

	if (!user) {
		return response.status(400).json({ error: 'user is not valid' });
	}

	if (body.content === undefined) {
		return response.status(400).json({ error: 'content missing' });
	}

	const note = new Note({
		content: body.content,
		important: body.important || false,
		date: new Date(),
		user: user.id,
	});
	const savedNote = await note.save();
	user.notes = user.notes.concat(savedNote.id);
	await user.save();

	response.status(201).json(savedNote);
});

notesRouter.get('/:id', async (request, response) => {
	const note = await Note.findById(request.params.id).populate('user', {
		username: 1,
		name: 1,
	});
	if (note) {
		response.json(note);
	} else {
		response.status(404).end();
	}
});

notesRouter.delete('/:id', async (request, response) => {
	await Note.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

notesRouter.put('/:id', async (request, response) => {
	const body = request.body;

	const note = {
		content: body.content,
		important: body.important || false,
	};

	const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
		new: true,
		runValidators: true,
		context: 'query',
	});
	response.json(updatedNote);
});

module.exports = notesRouter;

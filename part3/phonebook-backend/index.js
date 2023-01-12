require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/people');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('body', (req, res) => JSON.stringify(req?.body));
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// Get all persons
app.get('/api/persons', (request, response) => {
	Person.find({}).then((result) => {
		response.json(result);
	});
});

// Create new person
app.post('/api/persons', (request, response) => {
	const body = request.body;
	if (!body.name) {
		return response.status(400).json({ error: 'name must be required field' });
	}
	if (!body.number) {
		return response
			.status(400)
			.json({ error: 'number must be required field' });
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	});
	person.save().then((savedPerson) => {
		response.status(201).json(person);
	});
});
// Get single person

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => response.json(person))
		.catch((error) => next(error));
});

// Update single person
app.put('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndUpdate(
		request.params.id,
		{
			name: request.body.name,
			number: request.body.number,
		},
		{ new: true }
	)
		.then((person) => response.status(200).json(person))
		.catch((error) => next(error));
});
// Delete single person
app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => response.status(204).end())
		.catch((error) => next(error));
});
// Get persons info
app.get('/info', (request, response) => {
	Person.find({})
		.then((result) => {
			response
				.status(200)
				.send(
					`<p>Phonebook has info for ${
						result.length
					} people</p><p>${new Date()}</p>`
				);
		})
		.catch((err) => response.status(500).json({ error: err.message }));
});

const unknowEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknowEndpoint);

const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	}
	next();
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});

const express = require('express');
const morgan = require('morgan');

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

const app = express();

app.use(express.json());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

const generateId = () => {
	let id = 0;
	for (let i = 0; i < 19; i++) {
		id += Math.floor(Math.random() * 10);
	}
	return id;
};

// Get all persons
app.get('/api/persons', (request, response) => {
	response.json(persons);
});
// Create new person
app.post('/api/persons', (request, response) => {
	const body = request.body;
	if (!body.name) {
		return response.status(400).json({ error: 'name must be required field' });
	}
	if (
		persons.find(
			(person) => person.name.toLowerCase() === body.name.toLowerCase()
		)
	) {
		return response.status(400).json({ error: 'name must be unique' });
	}
	if (!body.number) {
		return response
			.status(400)
			.json({ error: 'number must be required field' });
	}

	const person = {
		id: generateId(),
		name: body.name,
		number: body.number,
	};
	persons = persons.concat(person);

	response.status(201).json(person);
});
// Get single person
app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((person) => person.id === id);
	if (!person) {
		return response.status(404).json({ error: 'Data not found for this ID' });
	}
	response.status(200).json(person);
});
// Update single person
app.put('/api/persons/:id', (request, response) => {});
// Delete single person
app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((person) => person.id === id);
	if (!person) {
		return response.status(404).json({ error: 'Data not found for this ID' });
	}
	persons = persons.filter((person) => person.id !== id);
	response.status(204).end();
});
// Get persons info
app.get('/info', (request, response) => {
	response
		.status(200)
		.send(
			`<p>Phonebook has info for ${
				persons.length
			} people</p><p>${new Date()}</p>`
		);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});

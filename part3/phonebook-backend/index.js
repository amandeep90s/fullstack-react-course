const express = require("express");
const morgan = require("morgan");

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

const requestLogger = (request, response, next) => {
	console.log("Method:", request.method);
	console.log("Path:", request.path);
	console.log("Body:", request.body);
	console.log("----");
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "Unknown endpoint" });
};

const app = express();

app.use(express.json());

app.use(requestLogger);

app.use(express.static("dist"));

morgan.token("body", (request) => JSON.stringify(request.body));

app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (request, response) => {
	response.send("<h1>Hello world</h1>");
});

app.get("/api/info", (request, response) => {
	const content = `<p>Phonebook has info for ${
		persons.length
	} people <br /> ${new Date()}</p>`;
	response.send(content);
});

app.get("/api/persons", (request, response) => {
	response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((n) => n.id === id);
	if (person) {
		response.json(person);
	} else {
		response.status(404).json({ message: "person does not exist" });
	}
});

app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((n) => n.id !== id);
	response.status(204).end();
});

const generateId = () => {
	const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
	return maxId + 1;
};

app.post("/api/persons", (request, response) => {
	const { body } = request;

	if (!body.name) {
		return response.status(400).json({ error: "name is missing" });
	}

	if (!body.number) {
		return response.status(400).json({ error: "number is missing" });
	}

	const isExist = persons.find((person) => body.name === person.name);
	if (isExist) {
		return response.status(400).json({ error: "name must be unique" });
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateId(),
	};

	persons = persons.concat(person);
	response.json(person);
});

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

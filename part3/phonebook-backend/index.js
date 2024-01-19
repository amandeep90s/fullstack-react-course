require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Person = require("./models/person");

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

app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.use(express.static("dist"));

morgan.token("body", (request) => JSON.stringify(request.body));

app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (_request, response) => {
	response.send("<h1>Hello world</h1>");
});

app.get("/api/info", (request, response, next) => {
	Person.find({})
		.then((notes) => {
			const content = `<p>Phonebook has info for ${
				notes.length
			} people <br /> ${new Date()}</p>`;
			response.send(content);
		})
		.catch((error) => next(error));
});

app.get("/api/persons", (request, response, next) => {
	Person.find({})
		.then((notes) => response.json(notes))
		.catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person);
			} else {
				response.status(404).json({ message: "person does not exist" });
			}
		})
		.catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then(() => response.status(204).end())
		.catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
	const { name, number } = request.body;

	if (!name) {
		return response.status(400).json({
			error: "name missing",
		});
	}

	const person = new Person({ name, number });

	person
		.save()
		.then((savedPerson) => {
			response.json(savedPerson);
		})
		.catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
	const { name, number } = request.body;

	const person = {
		name,
		number,
	};

	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then((updatedPerson) => {
			response.json(updatedPerson);
		})
		.catch((error) => next(error));
});

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, _request, response, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).send({ error: error.message });
	}

	next(error);
};

// handler of requests with result to errors
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

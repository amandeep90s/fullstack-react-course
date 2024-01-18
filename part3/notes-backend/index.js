require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Note = require("./models/note");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("dist"));

app.get("/", (request, response) => {
	response.send("<h1>Hello world</h1>");
});

app.get("/api/notes", (request, response) => {
	Note.find({}).then((notes) => {
		response.json(notes);
	});
});

app.get("/api/notes/:id", (request, response) => {
	Note.findById(request.params.id).then((note) => {
		response.json(note);
	});
});

app.delete("/api/notes/:id", (request, response) => {
	Note.findByIdAndDelete(request.params.id).then((note) => {
		response.status(204).end();
	});
});

app.post("/api/notes", (request, response) => {
	const { body } = request;

	if (!body.content) {
		return response.status(400).json({ error: "Content is missing" });
	}

	const note = new Note({
		content: body.content,
		important: Boolean(body.important) || false,
	});

	note.save().then((savedNote) => {
		response.json(savedNote);
	});
});

app.put("/api/notes/:id", (request, response) => {
	const { body } = request;

	if (!body.content) {
		return response.status(400).json({ error: "Content is missing" });
	}

	const note = {
		content: body.content,
		important: Boolean(body.important) || false,
	};

	Note.findByIdAndUpdate(request.params.id, note, { new: true })
		.then((updatedNote) => {
			response.json(updatedNote);
		})
		.catch((error) => {
			console.error(error);
			response.status(500).json({ error: "Internal Server Error" });
		});
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

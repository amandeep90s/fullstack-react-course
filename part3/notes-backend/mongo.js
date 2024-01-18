const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/notes-backend-db";

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
	content: "CSS3 is super",
	important: true,
});

note.save().then((result) => {
	console.log("note saved");
	mongoose.connection.close();
});

Note.find({}).then((result) => {
	result.forEach((note) => {
		console.log(note);
	});
	mongoose.connection.close();
});

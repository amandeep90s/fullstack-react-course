import { useEffect, useState } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("");
	const [showAll, setShowAll] = useState(true);

	useEffect(() => {
		axios.get("http://localhost:3001/notes").then((response) => {
			setNotes(response.data);
		});
	}, []);

	const addNote = (e) => {
		e.preventDefault();
		if (newNote) {
			const noteObject = {
				content: newNote,
				important: Math.random() < 0.5,
				id: notes.length + 1,
			};

			setNotes(notes.concat(noteObject));
			setNewNote("");
		}
	};

	const handleNoteChange = (e) => {
		setNewNote(e.target.value);
	};

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	return (
		<div>
			<h1>Notes</h1>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? "important" : "all"}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note note={note} key={note.id} />
				))}
			</ul>

			<form onSubmit={addNote}>
				<input type="text" value={newNote} onChange={handleNoteChange} />

				<button type="submit">save</button>
			</form>
		</div>
	);
};

export default App;

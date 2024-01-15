import axios from "axios";
import { useEffect, useState } from "react";
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
			};

			axios.post("http://localhost:3001/notes", noteObject).then((response) => {
				setNotes(notes.concat(response.data));
				setNewNote("");
			});
		}
	};

	const handleNoteChange = (e) => {
		setNewNote(e.target.value);
	};

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	const toggleImportanceOf = (id) => {
		const url = `http://localhost:3001/notes/${id}`;
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		axios.put(url, changedNote).then((response) => {
			setNotes(notes.map((n) => (n.id !== id ? n : response.data)));
		});
	};

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
					<Note
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
						key={note.id}
					/>
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

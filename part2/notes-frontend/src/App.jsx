import { useEffect, useState } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("");
	const [showAll, setShowAll] = useState(true);

	useEffect(() => {
		noteService.getAll().then((initialNotes) => setNotes(initialNotes));
	}, []);

	const addNote = (e) => {
		e.preventDefault();
		if (newNote) {
			const noteObject = {
				content: newNote,
				important: Math.random() < 0.5,
			};

			noteService.create(noteObject).then((returnedNote) => {
				setNotes(notes.concat(returnedNote));
				setNewNote("");
			});
		}
	};

	const handleNoteChange = (e) => {
		setNewNote(e.target.value);
	};

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(id, changedNote)
			.then((returnedNote) =>
				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
			)
			.catch(() => {
				alert(`the note '${note.content}' was already deleted from server`);
				setNotes(notes.filter((n) => n.id !== id));
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

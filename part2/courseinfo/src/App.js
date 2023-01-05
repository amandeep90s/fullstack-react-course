import React, { useEffect, useState } from 'react';
import noteService from './services/notes';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const hook = () => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	};

	useEffect(hook, []);

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	const addNote = (event) => {
		event.preventDefault();
		const noteObject = {
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() < 0.5,
		};

		noteService.create(noteObject).then((returnedNote) => {
			setNotes(notes.concat(returnedNote));
			setNewNote('');
		});
	};

	const handleNoteChange = (event) => {
		setNewNote(event.target.value);
	};

	const toggleImportanceOf = (noteId) => {
		const note = notes.find((note) => note.id === noteId);
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(noteId, changedNote)
			.then((returnedNote) => {
				setNotes(
					notes.map((note) => (note.id !== noteId ? note : returnedNote))
				);
			})
			.catch((error) => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
				setNotes(notes.filter((n) => n.id !== noteId));
			});
	};

	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} />
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				))}
			</ul>

			<form onSubmit={addNote}>
				<input
					type='text'
					value={newNote}
					onChange={handleNoteChange}
					placeholder='a new note...'
				/>
				<button type='submit'>save</button>
			</form>

			<Footer />
		</div>
	);
};

export default App;

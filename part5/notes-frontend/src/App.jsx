import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/notes';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import NoteForm from './components/NoteForm';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJson) {
      const parsedData = JSON.parse(loggedUserJson);
      setUser(parsedData);
      noteService.setToken(parsedData.token);
    }
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
        setNewNote('');
      });
    }
  };

  const noteForm = () => (
    <Togglable buttonLabel='New note'>
      <NoteForm
        value={newNote}
        handleChange={({ target }) => setNewNote(target.value)}
        handleSubmit={addNote}
      />
    </Togglable>
  );

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
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginResponse = await loginService.login({ username, password });

      window.localStorage.setItem(
        'loggedNoteAppUser',
        JSON.stringify(loginResponse)
      );

      noteService.setToken(loginResponse.token);

      setUser(loginResponse);
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Wrong Credentials');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </Togglable>
  );

  return (
    <div>
      <h1>Notes</h1>
      {errorMessage && <Notification message={errorMessage} />}

      {user === null ? loginForm() : noteForm()}

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
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

      <Footer />
    </div>
  );
};

export default App;

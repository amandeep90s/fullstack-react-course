import { useEffect, useRef, useState } from 'react';
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
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();

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

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };

  const noteForm = () => (
    <Togglable buttonLabel='New note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
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

  const handleLogin = async (credentials) => {
    try {
      const loginResponse = await loginService.login(credentials);

      window.localStorage.setItem(
        'loggedNoteAppUser',
        JSON.stringify(loginResponse)
      );

      noteService.setToken(loginResponse.token);

      setUser(loginResponse);
    } catch (error) {
      setErrorMessage('Wrong Credentials');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm loginAttempt={handleLogin} />
    </Togglable>
  );

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser');
    setUser(null);
  };

  return (
    <div>
      <h1>Notes</h1>
      {user !== null && (
        <p>
          {user.name} logged in <button onClick={handleLogout}>Logout</button>
        </p>
      )}
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

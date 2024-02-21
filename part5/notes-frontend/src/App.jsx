import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/notes';
import loginService from './services/login';

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
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          id='username'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          style={{ display: 'block' }}
        />
      </div>

      <div>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={{ display: 'block' }}
        />
      </div>

      <input type='submit' value='Login' />
    </form>
  );

  const noteForm = () => (
    <div>
      <p>{user.name} logged-in</p>
      <form onSubmit={addNote}>
        <input type='text' value={newNote} onChange={handleNoteChange} />

        <button type='submit'>save</button>
      </form>
    </div>
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

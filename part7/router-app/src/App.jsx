import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useMatch,
  useNavigate,
} from 'react-router-dom';

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry&apos;s standard dummy text ever since
      the 1500s, when an unknown printer took a galley of type and scrambled it
      to make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  </div>
);

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div>
        <strong>{note.important ? 'important' : ''}</strong>
      </div>
    </div>
  );
};

Note.propTypes = {
  note: PropTypes.object,
};

const Notes = ({ notes }) => (
  <div>
    <h2>Notes Page</h2>
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

Notes.propTypes = {
  notes: PropTypes.array,
};

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
);

const Login = (props) => {
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogin('amandeep');
    navigate('/');
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={onSubmit}>
        <div>
          username: <input type='text' />
        </div>

        <div>
          password: <input type='password' />
        </div>

        <button type='submit'>login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func,
};

const App = () => {
  const padding = { padding: 5 };
  const match = useMatch('/notes/:id');

  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen',
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen',
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas',
    },
  ]);
  const [user, setUser] = useState(null);
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  const login = (user) => setUser(user);

  return (
    <div>
      <div>
        <Link style={padding} to='/'>
          Home
        </Link>
        <Link style={padding} to='/notes'>
          Notes
        </Link>
        <Link style={padding} to='/users'>
          Users
        </Link>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={padding} to='/login'>
            Login
          </Link>
        )}
      </div>

      <Routes>
        <Route path='/notes/:id' element={<Note note={note} />} />
        <Route path='/notes' element={<Notes notes={notes} />} />
        <Route
          path='/users'
          element={user ? <Users /> : <Navigate replace to='/login' />}
        />
        <Route path='/login' element={<Login onLogin={login} />} />
        <Route path='/' element={<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </div>
  );
};

export default App;

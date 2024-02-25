import { useEffect, useState } from 'react';
import blogService from './services/blogs';
import Blog from './components/Blog';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginResponse = await loginService.login({ username, password });

      window.localStorage.setItem(
        'loggedNoteAppUser',
        JSON.stringify(loginResponse)
      );

      setUser(loginResponse);
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Wrong Credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <h1>User Login</h1>
      <div>
        <label htmlFor='username'>Username</label> <br />
        <input
          type='text'
          id='username'
          name='username'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder='Enter username'
          required
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label> <br />
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder='Enter password'
          required
        />
      </div>
      <br />
      <button type='submit'>Login</button>
    </form>
  );

  return (
    <>
      {errorMessage && <Notification message={errorMessage} />}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;

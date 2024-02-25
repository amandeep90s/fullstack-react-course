import { useEffect, useState } from 'react';
import blogService from './services/blogs';
import Blog from './components/Blog';
import loginService from './services/login';
import Notification from './components/Notification';

const initialBlog = { title: '', url: '', author: '' };

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blog, setBlog] = useState(initialBlog);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJson) {
      const parsedData = JSON.parse(loggedUserJson);
      setUser(parsedData);
      blogService.setToken(parsedData.token);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginResponse = await loginService.login({ username, password });

      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(loginResponse)
      );

      blogService.setToken(loginResponse.token);

      setUser(loginResponse);
      setUsername('');
      setPassword('');
    } catch (error) {
      setMessageType('error');
      setMessage('Wrong username or password');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <h1>User Login</h1>
      {message && <Notification message={message} />}
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create(blog);
      setBlogs(blogs.concat(newBlog));
      setBlog(initialBlog);
      setMessageType('success');
      setMessage(`a new blog ${blog.title} by ${blog.author} added`);
    } catch (error) {
      setMessageType('error');
      setMessage(error.response.data.error);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const newBlogForm = () => (
    <form onSubmit={handleCreateBlog}>
      <h2>Create new blog</h2>
      <div>
        <label htmlFor='title'>Title</label> <br />
        <input
          type='text'
          id='title'
          name='title'
          value={blog.title}
          onChange={({ target }) => setBlog({ ...blog, title: target.value })}
          placeholder='Enter title'
        />
      </div>
      <div>
        <label htmlFor='author'>Author</label> <br />
        <input
          type='text'
          id='author'
          name='author'
          value={blog.author}
          onChange={({ target }) => setBlog({ ...blog, author: target.value })}
          placeholder='Enter author'
        />
      </div>
      <div>
        <label htmlFor='url'>Url</label> <br />
        <input
          type='text'
          id='url'
          name='url'
          value={blog.url}
          onChange={({ target }) => setBlog({ ...blog, url: target.value })}
          placeholder='Enter url'
        />
      </div>
      <button type='submit'>Create</button>
    </form>
  );

  return user === null ? (
    loginForm()
  ) : (
    <div>
      <h1>Blogs</h1>
      {message && <Notification message={message} type={messageType} />}
      <div style={{ marginBottom: '1rem' }}>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </div>
      {newBlogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
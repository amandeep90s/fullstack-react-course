import { useEffect, useState, useRef } from 'react';
import blogService from './services/blogs';
import Blog from './components/Blog';
import loginService from './services/login';
import Notification from './components/Notification';
import Toggable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

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

  const handleSubmit = async (loginObject) => {
    try {
      const loginResponse = await loginService.login(loginObject);

      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(loginResponse)
      );

      blogService.setToken(loginResponse.token);

      setUser(loginResponse);
    } catch (error) {
      setMessageType('error');
      setMessage('Wrong username or password');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <LoginForm message={message} loginAttempt={handleSubmit} user={user} />
  );

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  const handleCreateBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog);
      blogFormRef.current.toggleVisibility();

      setBlogs(blogs.concat(response));
      setMessageType('success');
      setMessage(`a new blog ${response.title} by ${response.author} added`);
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  const handleBlogUpdate = async (id, updatedBlog) => {
    try {
      const response = await blogService.update(id, updatedBlog);

      const newBlogs = blogs.map((blog) =>
        blog.id.toString() === response.id.toString() ? response : blog
      );
      setBlogs(newBlogs);
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  const handleBlogDelete = async (deletedBlog) => {
    try {
      if (
        confirm(`Remove ${deletedBlog.title} by ${deletedBlog.author}`) === true
      ) {
        await blogService.destroy(deletedBlog.id);

        const newBlogs = blogs.filter(
          (blog) => blog.id.toString() !== deletedBlog.id.toString()
        );
        setBlogs(newBlogs);
      }
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  const handleError = (error) => {
    setMessageType('error');
    setMessage(error);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const newBlogForm = () => (
    <Toggable buttonLabel='Create New Blog' ref={blogFormRef}>
      <BlogForm createBlog={handleCreateBlog} />
    </Toggable>
  );

  return user === null ? (
    loginForm()
  ) : (
    <div>
      <h1>Blogs</h1>
      {message && <Notification message={message} type={messageType} />}
      <div style={{ marginBottom: '1rem' }}>
        {user.name} logged in{' '}
        <button id='logoutButton' onClick={handleLogout}>
          Logout
        </button>
      </div>
      {newBlogForm()}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={handleBlogUpdate}
          deleteBlog={handleBlogDelete}
        />
      ))}
    </div>
  );
};

export default App;

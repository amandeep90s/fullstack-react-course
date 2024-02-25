import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialBlogState = { title: '', url: '', author: '' };

const BlogForm = ({ createBlog }) => {
  const [blog, setBlog] = useState(initialBlogState);

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog(blog);

    setBlog(initialBlogState);
  };

  return (
    <form onSubmit={handleSubmit}>
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
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;

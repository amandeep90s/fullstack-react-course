import { shape, func, string, number } from 'prop-types';
import { useState, memo } from 'react';

const Blog = memo(({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    padding: '0.3rem 0.5rem',
    border: 'solid 2px #232323',
    margin: '0.5rem 0',
  };

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div style={blogStyle} className='blog-content'>
      <p>
        {blog.title} - {blog.author}
        <button
          className='showHideButton'
          onClick={toggleVisibility}
          style={{ marginLeft: 10 }}
        >
          {visible ? 'Hide' : 'View'}
        </button>
        {visible && (
          <>
            <br />
            Url:{' '}
            <a href={blog.url} target='_blank' rel='noreferrer'>
              {blog.url}
            </a>
            <br />
            Likes: {blog.likes}{' '}
            <button
              className='updateButton'
              onClick={() =>
                updateBlog(blog.id, { ...blog, likes: blog.likes + 1 })
              }
            >
              Like
            </button>
            <br />
            Author: {blog.author}
            <br />
            <button className='deleteButton' onClick={() => deleteBlog(blog)}>
              Remove
            </button>
          </>
        )}
      </p>
    </div>
  );
});

Blog.propTypes = {
  blog: shape({
    id: string.isRequired,
    createdAt: string,
    updatedAt: string,
    title: string.isRequired,
    author: string.isRequired,
    likes: number,
    url: string,
  }),
  updateBlog: func,
  deleteBlog: func,
};

Blog.displayName = 'Blog';

export default Blog;

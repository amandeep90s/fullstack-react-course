const Blog = require('../models/blog');

const getBlogs = async (request, response) => {
  const blogs = Blog.find({});
  response.status(200).json(blogs);
};

const getBlog = async (request, response) => {
  const blog = Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).json({ error: 'Blog does not found' });
  }
};

const createBlog = async (request, response) => {
  const { title, author, url } = request.body;

  if (!title) {
    return response.status(400).json({ error: 'title is missing' });
  }
  if (!author) {
    return response.status(400).json({ error: 'author is missing' });
  }
  if (!url) {
    return response.status(400).json({ error: 'url is missing' });
  }

  const blogObject = { title, author, url };

  const blog = Blog.create(blogObject);

  response.status(201).json(blog);
};

const updateBlog = async (request, response) => {
  const { title, author, url, likes } = request.body;

  if (!title) {
    return response.status(400).json({ error: 'title is missing' });
  }
  if (!author) {
    return response.status(400).json({ error: 'author is missing' });
  }
  if (!url) {
    return response.status(400).json({ error: 'url is missing' });
  }

  const updatedBlogObject = { title, author, url, likes };

  const updatedBlog = Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlogObject,
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  );

  response.json(updatedBlog);
};

const deleteBlog = async (request, response) => {
  Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};

const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response, next) => {
  Blog.find({})
    .then((blogs) => response.json(blogs))
    .catch((error) => next(error));
});

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => response.json(blog))
    .catch((error) => next(error));
});

blogsRouter.post('/', (request, response, next) => {
  const { body } = request;

  if (!body.title) {
    return response.status(400).json({ error: 'title is missing' });
  }
  if (!body.author) {
    return response.status(400).json({ error: 'author is missing' });
  }
  if (!body.url) {
    return response.status(400).json({ error: 'url is missing' });
  }

  const blogObject = {
    title: body.title,
    author: body.author,
    url: body.url,
  };

  Blog.create(blogObject)
    .then((blog) => response.json(blog))
    .catch((error) => next(error));
});

blogsRouter.put('/:id', (request, response, next) => {
  const { body } = request;

  if (!body.title) {
    return response.status(400).json({ error: 'title is missing' });
  }
  if (!body.author) {
    return response.status(400).json({ error: 'author is missing' });
  }
  if (!body.url) {
    return response.status(400).json({ error: 'url is missing' });
  }

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((blog) => response.json(blog))
    .catch((error) => next(error));
});

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

module.exports = blogsRouter;

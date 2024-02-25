const Blog = require('../models/blog');

const getBlogs = async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    name: 1,
    username: 1,
  });
  response.status(200).json(blogs);
};

const getBlog = async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    name: 1,
    username: 1,
  });
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

  const blogObject = { title, author, url, user: request.user.id };

  const blog = await Blog.create(blogObject);

  request.user.blogs = request.user.blogs.concat(blog._id);
  await request.user.save();

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

  const blog = await Blog.findById(request.params.id).populate('user', {
    name: 1,
    username: 1,
  });
  if (!blog) {
    return response.status(401).json({ error: 'Blog is not found' });
  }

  if (blog?.user?.id?.toString() === request.user.id.toString()) {
    const updatedBlogObject = { title, author, url, likes };

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedBlogObject,
      {
        new: true,
        runValidators: true,
        context: 'query',
      }
    );

    response.json(updatedBlog);
  } else {
    response
      .status(401)
      .json({ error: 'You are not allowed to update this blog' });
  }
};

const deleteBlog = async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() === request.user.id.toString()) {
    request.user.blogs = request.user.blogs.filter(
      (b) => b.toString() !== blog.id.toString()
    );

    await request.user.save();

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } else {
    response
      .status(401)
      .json({ error: 'You are not allowed to delete this blog' });
  }
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};

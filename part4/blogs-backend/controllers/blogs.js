const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	if (blog) {
		response.status(200).json(blog);
	} else {
		response.status(404).end();
	}
});

blogsRouter.post('/', async (request, response) => {
	const body = request.body;
	if (body.title === undefined) {
		return response.status(400).json({ error: 'title missing' });
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	});

	const savedBlog = await blog.save();
	response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
	const blog = {
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
		runValidators: true,
		context: 'query',
	});

	response.status(200).json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

module.exports = blogsRouter;

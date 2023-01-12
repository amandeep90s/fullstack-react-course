const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

blogsRouter.get('/:id', (request, response, next) => {
	Blog.findById(request.params.id)
		.then((returnedBlog) => response.status(200).json(returnedBlog))
		.catch((error) => next(error));
});

blogsRouter.post('/', (request, response, next) => {
	const body = request.body;

	// if (body.title === undefined) {
	// 	return response.status(400).json({ error: 'title missing' });
	// }
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	});

	blog
		.save()
		.then((savedBlog) => {
			response.status(201).json(savedBlog);
		})
		.catch((error) => next(error));
});

blogsRouter.put('/:id', (request, response, next) => {
	const blog = {
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes,
	};

	Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
		runValidators: true,
		context: 'query',
	})
		.then((returnedBlog) => response.status(200).json(returnedBlog))
		.catch((error) => next(error));
});

blogsRouter.delete('/:id', (request, response, next) => {
	Blog.findByIdAndRemove(request.params.id)
		.then(() => response.status(204).end())
		.catch((error) => next(error));
});

module.exports = blogsRouter;

const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
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

	// @ts-ignore
	const extractedUser = request.user;
	if (!extractedUser.id) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}

	const user = await User.findById(extractedUser.id);
	if (!user) {
		return response.status(400).json({ error: 'user is not valid' });
	}

	if (body.title === undefined) {
		return response.status(400).json({ error: 'title missing' });
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user.id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog.id);
	await user.save();

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
	// @ts-ignore
	const extractedUser = request.user;
	if (!extractedUser.id) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}

	const blogId = request.params.id;
	const blog = await Blog.findOne({ _id: blogId, user: extractedUser.id });
	if (!blog) {
		return response.status(401).json({ error: 'you are not authorized!!' });
	}

	await Blog.findByIdAndRemove(blogId);
	response.status(204).end();
});

module.exports = blogsRouter;

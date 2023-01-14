const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
	{
		title: 'Mark Cunighan Life Story',
		url: 'https://netflix.com',
		author: 'David Richard',
		likes: 50,
	},
	{
		title: 'The Dark Side',
		url: 'https://hotstar.com',
		author: 'Morning Star',
		likes: 12,
	},
];

const nonExistingId = async () => {
	const blog = new Blog({
		title: 'Mark Cunighan Life Story',
		url: 'https://netflix.com',
		author: 'David Richard',
		likes: 50,
	});

	await blog.save();
	await blog.remove();
	return blog._id.toString();
};

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

module.exports = { initialBlogs, nonExistingId, blogsInDb, usersInDb };

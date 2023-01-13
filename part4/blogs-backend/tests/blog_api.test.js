const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(helper.initialBlogs);
});

describe('when there is initially some blogs saved', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('blogs are having unique identifier', async () => {
		const blogsToStart = await helper.blogsInDb();
		const blogToView = blogsToStart[0];
		const processedBlogToView = JSON.parse(JSON.stringify(blogToView));
		expect(processedBlogToView.id).toBeDefined();
	});
});

describe('addition of a new blog', () => {
	test('succeeds with valid data', async () => {
		const newBlog = {
			title: 'My new post is from earth',
			author: 'Amandeep Singh',
			url: 'https://instagram.com',
			likes: 90,
		};

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

		const contents = blogsAtEnd.map((b) => b.title);
		expect(contents).toContain('My new post is from earth');
	});

	test('check the default value of blog if its missing', async () => {
		const newBlog = {
			title: 'My new post is from earth',
			author: 'Amandeep Singh',
			url: 'https://instagram.com',
		};

		const response = await api.post('/api/blogs').send(newBlog);
		expect(response.body.likes).toBe(0);
	});

	test('fails with status cod 400 if data in invalid', async () => {
		const newBlog = {
			url: 'https://instagram.com',
		};

		await api.post('/api/blogs').send(newBlog).expect(400);

		const blogsAtEnd = await helper.initialBlogs;
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	});
});

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if is valid', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[0];
		// @ts-ignore
		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

		const contents = blogsAtEnd.map((r) => r.title);
		expect(contents).not.toContain(blogToDelete.title);
	});
});

describe('updation of a blog', () => {
	test('succeeds with status code 200 if blog is updated', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[0];
		const updateBlog = { likes: 77 };

		await api.put(`/api/blogs/${blogToDelete.id}`).send(updateBlog).expect(200);

		const blogsAtEnd = await helper.blogsInDb();
		const contents = blogsAtEnd.map((r) => r.likes);
		expect(contents).toContain(77);
	});
});

afterAll(() => {
	mongoose.connection.close();
});

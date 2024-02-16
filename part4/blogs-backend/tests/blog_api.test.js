const { after, beforeEach, describe, test } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const contents = response.body.map((item) => item.title);
    assert(contents.includes(helper.initialBlogs[0].title));
  });

  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsToStart = await helper.blogsInDb();

      const blogToView = blogsToStart[0];

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.strictEqual(resultBlog.body.title, blogToView.title);
    });

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
    });

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';

      await api.get(`/api/blogs/${invalidId}`).expect(400);
    });
  });

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'My Custom Blog',
        author: 'Amandeep Singh',
        url: 'https://singhprogrammer.com',
        likes: 500,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

      const contents = blogsAtEnd.map((blog) => blog.title);
      assert(contents.includes(newBlog.title));
    });

    test('fails with status code 400 if data invalid', async () => {
      const newBlog = {
        author: 'Amandeep Singh',
        url: 'https://singhprogrammer.com',
        likes: 500,
      };

      await api.post('/api/blogs').send(newBlog).expect(400);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });
  });

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

      const contents = blogsAtEnd.map((item) => item.title);
      assert(!contents.includes(blogToDelete.title));
    });
  });
});

after(async () => mongoose.connection.close());

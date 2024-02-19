const { after, beforeEach, describe, test } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

let authHeader;

describe('blogs api', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    // Create a test user and save the corresponding auth header
    const user = helper.initialUsers[0];
    await api.post('/api/users').send(user);
    const response = await api.post('/api/auth/login').send(user);
    authHeader = `Bearer ${response.body.token}`;
  });

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

    describe('upading a specific blog', () => {
      test('a blog can be edited', async () => {
        await Blog.deleteMany({});

        const blog = helper.initialBlogs[0];

        await api
          .post('/api/blogs')
          .set('Authorization', authHeader)
          .send(blog);

        const [blogBefore] = await helper.blogsInDb();
        const modifiedBlog = { ...blogBefore, title: 'Goto considered useful' };

        await api
          .put(`/api/blogs/${blogBefore.id}`)
          .set('Authorization', authHeader)
          .send(modifiedBlog)
          .expect(200);

        const blogs = await helper.blogsInDb();
        const titles = blogs.map((r) => r.title);

        assert(titles.includes(modifiedBlog.title));
      });

      test('a blog can not be edited', async () => {
        await Blog.deleteMany({});

        const blog = helper.initialBlogs[0];

        await api
          .post('/api/blogs')
          .set('Authorization', authHeader)
          .send(blog);

        const [blogBefore] = await helper.blogsInDb();
        const modifiedBlog = { ...blogBefore, title: 'Goto considered useful' };

        await api
          .put(`/api/blogs/${blogBefore.id}`)
          .send(modifiedBlog)
          .expect(400);
      });
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
          .set('Authorization', authHeader)
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

        const contents = blogsAtEnd.map((blog) => blog.title);
        assert(contents.includes(newBlog.title));
      });

      test('has likes initialized to 0 if initial value is not given', async () => {
        const blog = {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        };

        const response = await api
          .post('/api/blogs')
          .set('Authorization', authHeader)
          .send(blog)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        assert.strictEqual(response.body.likes, 0);
      });

      test('fails with status code 400 if data invalid', async () => {
        const newBlog = {
          author: 'Amandeep Singh',
          url: 'https://singhprogrammer.com',
          likes: 500,
        };

        await api
          .post('/api/blogs')
          .set('Authorization', authHeader)
          .send(newBlog)
          .expect(400);

        const blogsAtEnd = await helper.blogsInDb();

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
      });
    });

    describe('deletion of a blog', () => {
      let id;
      let title;
      beforeEach(async () => {
        await Blog.deleteMany({});

        const blog = helper.initialBlogs[0];

        const response = await api
          .post('/api/blogs')
          .set('Authorization', authHeader)
          .send(blog);

        id = response.body.id;
        title = response.body.title;
      });

      test('can be deleted by the creator', async () => {
        await api
          .delete(`/api/blogs/${id}`)
          .set('Authorization', authHeader)
          .expect(204);

        const blogs = await helper.blogsInDb();

        assert.strictEqual(blogs.length, 0);

        const contents = blogs.map((item) => item.title);
        assert(!contents.includes(title));
      });

      test('can not be deleted without valid auth header', async () => {
        await api.delete(`/api/blogs/${id}`).expect(400);

        const blogs = await helper.blogsInDb();

        assert.strictEqual(blogs.length, 1);
      });
    });

    describe('creation of a user', () => {
      test('succeeds with valid username and password', async () => {
        const user = {
          username: 'aman',
          password: '123456',
        };

        await api
          .post('/api/users')
          .send(user)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        const users = await helper.usersInDb();
        assert.strictEqual(users.length, helper.initialUsers.length + 1);

        const usernames = users.map((u) => u.username);
        assert(usernames.includes(user.username));
      });

      test('fails with a proper error if username is too short', async () => {
        const user = {
          username: 'am',
          password: '123456',
        };

        const response = await api
          .post('/api/users')
          .send(user)
          .expect(400)
          .expect('Content-Type', /application\/json/);

        assert(
          response.body.errors.includes(
            'Username must be at least 3 characters'
          )
        );
      });

      test('fails with a proper error if password is too short', async () => {
        const user = {
          username: 'amandeep',
          password: '12',
        };

        const response = await api
          .post('/api/users')
          .send(user)
          .expect(400)
          .expect('Content-Type', /application\/json/);

        assert(
          response.body.errors.includes(
            'Password must be at least 3 characters'
          )
        );
      });

      test('fails with a proper error if username not unique', async () => {
        const user = helper.initialUsers[0];

        const response = await api
          .post('/api/users')
          .send(user)
          .expect(400)
          .expect('Content-Type', /application\/json/);

        assert(
          response.body.error.includes('expected `username` to be unique')
        );
      });
    });
  });
});

after(async () => mongoose.connection.close());

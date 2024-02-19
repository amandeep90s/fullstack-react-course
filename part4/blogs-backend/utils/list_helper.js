const { groupBy } = require('lodash');

const dummy = () => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => blog.likes + sum, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return;
  }

  const { title, likes, author } = blogs.sort(
    (b1, b2) => b2.likes - b1.likes
  )[0];

  return { title, likes, author };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }

  const blogsByAuthor = groupBy(blogs, (blog) => blog.author);

  const authorBlogs = Object.entries(blogsByAuthor).reduce(
    (array, [author, blogList]) => {
      return array.concat({
        author,
        blogs: blogList.length,
      });
    },
    []
  );

  return authorBlogs.toSorted((e1, e2) => e2.blogs - e1.blogs)[0];
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }

  const blogsByAuthor = groupBy(blogs, (blog) => blog.author);

  const authorBlogs = Object.entries(blogsByAuthor).reduce(
    (array, [author, blogList]) => {
      return array.concat({
        author,
        likes: blogList.reduce((sum, blog) => sum + blog.likes, 0),
      });
    },
    []
  );

  return authorBlogs.toSorted((el1, el2) => el2.likes - el1.likes)[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

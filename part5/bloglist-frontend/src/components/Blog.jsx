import { shape, string, number } from 'prop-types';

const Blog = ({ blog }) => {
  return (
    <div>
      {blog.title} - {blog.author}
    </div>
  );
};

Blog.propTypes = {
  blog: shape({
    id: string.isRequired,
    createdAt: string,
    updatedAt: string,
    title: string.isRequired,
    author: string.isRequired,
    likes: number,
    url: string,
  }),
};

export default Blog;

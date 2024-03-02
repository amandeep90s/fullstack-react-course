import React from 'react';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

const blog = {
  title: 'My Blog',
  author: 'John Doe',
  url: 'http://google.com',
  likes: 0,
};

test('should render right blog details', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm createBlog={createBlog} />);

  // Get input field with placeholder
  const titleInput = screen.getByPlaceholderText('Enter title');
  const authorInput = screen.getByPlaceholderText('Enter author');
  const urlInput = screen.getByPlaceholderText('Enter url');

  const sendButton = container.querySelector('.submitButton');

  await user.type(titleInput, blog.title);
  await user.type(authorInput, blog.author);
  await user.type(urlInput, blog.url);

  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title);

  await user.click(sendButton);

  expect(createBlog.mock.calls);
});

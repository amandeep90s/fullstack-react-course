import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const blog = {
  id: '1234',
  title: 'My Blog',
  author: 'John Doe',
  url: 'http://google.com',
  likes: 0,
};

test('renders blog content without url and likes', () => {
  render(<Blog blog={blog} />);

  const title = screen.getByText(blog.title, { exact: false });
  expect(title).toBeDefined();

  const author = screen.getByText(blog.author, { exact: false });
  expect(author).toBeDefined();

  const url = screen.queryByText(blog.url);
  expect(url).toBeNull();

  const likes = screen.queryByText(blog.likes);
  expect(likes).toBeNull();
});

test('should display url and likes after click event', async () => {
  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = container.querySelector('.showHideButton');
  await user.click(button);

  const url = screen.findByText(blog.url);
  expect(url).toBeDefined();

  const likes = screen.findByText(blog.likes);
  expect(likes).toBeDefined();
});

test('called update handler method twice', async () => {
  const mockHandler = jest.fn();

  const { container } = render(<Blog blog={blog} updateBlog={mockHandler} />);

  const user = userEvent.setup();
  const toggleButton = container.querySelector('.showHideButton');
  await user.click(toggleButton);

  const updateButton = container.querySelector('.updateButton');
  await user.click(updateButton);
  await user.click(updateButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

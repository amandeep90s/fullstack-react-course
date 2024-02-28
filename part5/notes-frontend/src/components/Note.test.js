import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from './Note';

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  render(<Note note={note} />);

  const element = screen.getByText((text) => text.includes(note.content));
  // Below method is used to display the rendered component in terminal
  // screen.debug(element);
  expect(element).toBeDefined();
});

test('should renders content check with css query selector', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  const { container } = render(<Note note={note} />);

  const div = container.querySelector('.note');
  expect(div).toHaveTextContent(note.content);

  const element = screen.getByText((text) => text.includes(note.content));
  expect(element).toBeDefined();
});

test('clicking the button calls event handler code', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  const mockHandler = jest.fn();

  render(<Note note={note} toggleImportance={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText('make note important');
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

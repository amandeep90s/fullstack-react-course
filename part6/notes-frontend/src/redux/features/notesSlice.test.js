import deepFreeze from 'deep-freeze';
import notesReducer from './notesSlice';

describe('notes reducer', () => {
  test('returns new state with action notes/addNote', () => {
    const state = [];
    const action = {
      type: 'notes/addNote',
      payload: {
        content: 'the app state is in redux store',
        important: true,
        id: 1,
      },
    };

    deepFreeze(state);
    const newState = notesReducer.reducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState.map((s) => s.content)).toContainEqual(
      action.payload.content
    );
  });

  test('returns new state with action notes/toggleImportance', () => {
    const state = [
      {
        content: 'the app state is in redux store',
        important: true,
        id: 1,
      },
      {
        content: 'state changes are made with actions',
        important: false,
        id: 2,
      },
    ];

    const action = {
      type: 'notes/toggleImportance',
      payload: { id: 2 },
    };

    deepFreeze(state);
    const newState = notesReducer.reducer(state, action);

    expect(newState).toHaveLength(2);

    expect(newState).toContainEqual(state[0]);

    expect(newState).toContainEqual({
      content: 'state changes are made with actions',
      important: true,
      id: 2,
    });
  });
});

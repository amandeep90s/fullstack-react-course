import deepFreeze from 'deep-freeze';
import notesReducer, { addNote, toggleImportance } from './notesSlice';

describe('notes reducer', () => {
  it('should handle initial state', () => {
    expect(notesReducer(undefined, {})).toEqual({
      loading: false,
      error: null,
      notes: [],
    });
  });

  it('returns new state with action NEW_NOTE', () => {
    const initialState = {
      loading: false,
      error: null,
      notes: [],
    };

    deepFreeze(initialState.notes);

    const note = {
      content: 'the app state is in redux store',
      important: true,
      id: 1,
    };

    expect(
      notesReducer(initialState, {
        type: addNote.type,
        payload: note,
      })
    ).toEqual({
      loading: false,
      error: null,
      notes: [note],
    });
  });

  it('returns new state with action toggleImportance', () => {
    const initialState = {
      loading: false,
      error: null,
      notes: [],
    };

    const note = {
      content: 'the app state is in redux store',
      important: true,
      id: 1,
    };

    deepFreeze(initialState);

    const addNoteResponse = notesReducer(initialState, {
      type: addNote.type,
      payload: note,
    });

    expect(addNoteResponse.notes).toHaveLength(1);
    expect(addNoteResponse.notes[0]).toEqual(note);

    const toggleImportanceResponse = notesReducer(addNoteResponse, {
      type: toggleImportance.type,
      payload: addNoteResponse.notes[0],
    });
    console.log(toggleImportanceResponse);

    expect(toggleImportanceResponse.notes[0]).toEqual({
      ...note,
      important: false,
    });
  });
});

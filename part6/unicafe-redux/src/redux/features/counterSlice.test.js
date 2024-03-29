import deepFreeze from 'deep-freeze';
import counterSlice, { good } from './counterSlice';

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test('should return a proper initial state when called with undefined state', () => {
    expect(counterSlice.reducer(undefined, {})).toEqual(initialState);
  });

  test('good is incremented', () => {
    const state = initialState;

    deepFreeze(state);

    expect(
      counterSlice.reducer(initialState, {
        type: good.type,
        payload: initialState,
      })
    ).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });
});

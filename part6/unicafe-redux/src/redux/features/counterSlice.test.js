import deepFreeze from 'deep-freeze';
import counterSlice, { bad, good, ok, zero } from './counterSlice';

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

  test('bad is incremented', () => {
    const state = initialState;

    deepFreeze(state);

    expect(
      counterSlice.reducer(initialState, {
        type: bad.type,
        payload: initialState,
      })
    ).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });

  test('ok is incremented', () => {
    const state = initialState;

    deepFreeze(state);

    expect(
      counterSlice.reducer(initialState, {
        type: ok.type,
        payload: initialState,
      })
    ).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });

  test('state is reset', () => {
    const state = initialState;

    deepFreeze(state);

    expect(
      counterSlice.reducer(initialState, {
        type: zero.type,
        payload: initialState,
      })
    ).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    });
  });
});

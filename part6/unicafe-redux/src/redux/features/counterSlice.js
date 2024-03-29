import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  good: 0,
  bad: 0,
  ok: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    good: (state) => {
      state.good += 1;
    },
    bad: (state) => {
      state.bad += 1;
    },
    ok: (state) => {
      state.ok += 1;
    },
    zero: (state) => {
      state.good = 0;
      state.bad = 0;
      state.ok = 0;
    },
  },
});

export const { good, bad, ok, zero } = counterSlice.actions;

export default counterSlice;

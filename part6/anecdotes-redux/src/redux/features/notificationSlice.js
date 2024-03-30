import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => action.payload,
    resetNotification: () => initialState,
  },
});

export const { setNotification, resetNotification } = notificationSlice.actions;

export default notificationSlice;

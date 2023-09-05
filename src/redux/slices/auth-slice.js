import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userLogin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.userLogin = action.payload;
    },
  },
});

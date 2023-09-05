import { configureStore } from '@reduxjs/toolkit';
import { TodoSlice } from './slices/todo-slice';
import { authSlice } from './slices/auth-slice';

export const store = configureStore({
  reducer: {
    [TodoSlice.name]: TodoSlice.reducer,
    [authSlice.name]: authSlice.reducer,
  },
});

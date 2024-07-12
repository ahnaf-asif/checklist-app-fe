import { createSlice } from '@reduxjs/toolkit';

import { axios } from '@/Config';
import { EMPTY_AUTH_STATE, EMPTY_USER } from './AuthSliceConstants';
import { IUser } from './AuthSliceTypes';
import { extractUserFromToken } from './Helper';
import { loginUser } from './Functions';

const initialState = EMPTY_AUTH_STATE;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.loading = false;
      state.dispatched = true;
      state.error = null;
      state.user = EMPTY_USER;

      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('jwtToken');
    },
    updateAuth: (state, action) => {
      const token = action.payload;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const user = extractUserFromToken(token);
      state.loading = false;
      state.dispatched = true;
      state.error = null;
      state.user = user;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.dispatched = false;
      state.error = null;
      state.user = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.dispatched = true;
      state.error = null;
      state.user = action.payload as IUser;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.dispatched = true;
      state.error = action.payload as string;
      state.user = null;
    });
  }
});

export const { clearAuth, updateAuth } = authSlice.actions;
export default authSlice.reducer;

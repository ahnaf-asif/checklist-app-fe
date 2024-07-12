import { configureStore } from '@reduxjs/toolkit';
import { AuthReducer } from './Slices/AuthSlice';
import { AuthModalReducer } from './Slices/AuthModalSlice';

export const store = configureStore({
  reducer: { auth: AuthReducer, authModal: AuthModalReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

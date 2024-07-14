import { createSlice } from '@reduxjs/toolkit';

export const authModalSlice = createSlice({
  name: 'authModal',

  initialState: {
    isOpen: false
  },

  reducers: {
    openAuthModal: (state) => {
      console.log('openAuthModal triggered on');
      state.isOpen = true;
    },
    closeAuthModal: (state) => {
      state.isOpen = false;
      console.log('openAuthModal triggered off');
    }
  }
});

export const { openAuthModal, closeAuthModal } = authModalSlice.actions;
export default authModalSlice.reducer;

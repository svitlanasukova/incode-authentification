import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
  token: null
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
      console.log(action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

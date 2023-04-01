import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
  user: null,
  token: null
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    setCredentials(state, action) {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    }
  }
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;

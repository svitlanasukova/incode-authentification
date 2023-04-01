import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: ''
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
      state.user = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    }
  }
});

export const { login, logout, setError, setUser } = authSlice.actions;

export default authSlice.reducer;

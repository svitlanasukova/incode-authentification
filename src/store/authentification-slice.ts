import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  error: ''
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
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

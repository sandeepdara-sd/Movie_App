import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,  
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;  
    },
    logout(state) {
      localStorage.removeItem("userId");
      state.isLoggedIn = false;
      state.user = null;  
    },
  },
});

export const { login, logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

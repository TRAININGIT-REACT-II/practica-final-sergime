import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: JSON.parse(localStorage.getItem('user')) || {
    logged: false, 
    user: {
      id: null,
      username: null,
      token: null,
    }
  },
  reducers: {
    login: (state, action ) => {
      //! https://react-redux.js.org/tutorials/quick-start
      // Redux Toolkit allows us to write 'mutating' logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a 'draft state' and produces a brand new
      // immutable state based off those changes
      state.logged = true
      state.user.id = action.payload.id
      state.user.username = action.payload.username
      state.user.token = action.payload.token
    },
    logout: (state) => {
      state.logged = false
      state.user.id = null
      state.user.username = null
      state.user.token = null
    },
  }
});


// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;
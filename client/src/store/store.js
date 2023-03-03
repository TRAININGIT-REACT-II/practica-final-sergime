import { configureStore } from '@reduxjs/toolkit'
import { notesSlice } from "./slices/notes/notesSlice"
import { userSlice } from "./slices/user/userSlice"


export const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
    user: userSlice.reducer,
  },
})
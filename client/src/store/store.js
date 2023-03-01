import { configureStore } from '@reduxjs/toolkit'
import { notesSlice } from "./slices/notes/notesSlice"


export const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
  },
})
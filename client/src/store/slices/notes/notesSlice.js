import { createSlice } from '@reduxjs/toolkit'

export const notesSlice = createSlice({
  name: 'notes',
  initialState: JSON.parse(localStorage.getItem('notes')) || {
    notes: []
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    createNote: (state, action ) => {
      //! https://react-redux.js.org/tutorials/quick-start
      // Redux Toolkit allows us to write 'mutating' logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a 'draft state' and produces a brand new
      // immutable state based off those changes
      state.notes.push(action.payload)
    },
    updateNote: (state, action) => {

    },
    deleteNote: (state, action) => {

    },
  }
})


// Action creators are generated for each case reducer function
export const {
  setNotes,
  createNote,
  updateNote,
  deleteNote,
} = notesSlice.actions
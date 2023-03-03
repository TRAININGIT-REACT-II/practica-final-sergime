import { createSlice } from '@reduxjs/toolkit'

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: []
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    createNote: (state, /* action */ ) => {
      //! https://react-redux.js.org/tutorials/quick-start
      // Redux Toolkit allows us to write 'mutating' logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a 'draft state' and produces a brand new
      // immutable state based off those changes
      state.counter += 1;
    },
    updateNote: (state, action) => {

    },
  }
})


// Action creators are generated for each case reducer function
export const { createNote, updateNote } = notesSlice.actions
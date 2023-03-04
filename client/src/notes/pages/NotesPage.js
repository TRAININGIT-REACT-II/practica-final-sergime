import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import useApi from "../../shared/hooks/useApi";
import { setNotes } from "../../store/slices/notes/notesSlice";

export const NotesPage = () => {

  const { notes } = useSelector( state => state.notes );
  const { user } = useSelector( state => state.user );
  const dispatch = useDispatch();

  // // Definimos la llamada para login
  const notesRequest = useApi("/api/notes", user.token, {}, false);
    
  useEffect(() => {
    if (notesRequest.data) {
      // console.log('notesRequest.data', notesRequest.data)
      dispatch(setNotes(notesRequest.data))
      localStorage.setItem('notes', JSON.stringify({
        notes: notesRequest.data
      }))
    }

  }, [notesRequest])
  
  useEffect(() => {
    // console.log('store notes', notes)
    if (!notes.length)
    notesRequest.updateParams({
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    notesRequest.perform();
  }, [])
  
  
  return (
    <>
      <h1>Notes</h1>
    </>
  )
}

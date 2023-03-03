import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import useApi from "../../shared/hooks/useApi";

export const NotesPage = () => {

  const { notes } = useSelector( state => state.notes );
  const dispatch = useDispatch();

  // // Definimos la llamada para login
  // const notesRequest = useApi("/api/notes", "", {}, false);

  // useEffect(() => {
  //   const notesRequest = useApi("/api/notes", token);

  //   if (notesRequest.data) {
  //     console.log(loginRequest.data)
  //     // token = loginRequest.data.token;
  //     // login('Sergi')
  //     // navigate('/', {
  //     //   replace: true,
  //     // })
  //   }

  // }, [])
  
  
  return (
    <>
      <h1>Notes</h1>
    </>
  )
}

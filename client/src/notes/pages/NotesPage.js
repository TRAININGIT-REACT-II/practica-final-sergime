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
    if (!notes?.length && notesRequest.data) {
      // console.log('notesRequest.data', notesRequest.data)
      dispatch(setNotes(notesRequest.data))
      localStorage.setItem('notes', JSON.stringify({
        notes: notesRequest.data
      }))
    }

  }, [notesRequest])
  
  useEffect(() => {
    console.log('store notes', notes)
    if (!notes?.length)
    console.log('no notes')
    notesRequest.updateParams({
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    notesRequest.perform();
  }, [])
  
  const handleEditNote = () => {

  }

  const handleDeleteNote = () => {

  }
  
  return (
    <>
      <h1>Notes</h1>
      <div className="row">
        <div className="offset-2 col-8 table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr className="bg-dark text-white">
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Author</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                notes?.map(note => (
                  <tr key={ note.title }>
                    <td className="col-1">#</td>
                    <td className="col-2">{ note.title }</td>
                    <td className="col-4">{ note.content }</td>
                    <td className="col-1">{ note.author }</td>
                    <td  className="col">
                      <button
                        className="btn btn-primary"
                        onClick={ handleEditNote }
                      >
                        Edit note
                      </button>
                    </td>
                    <td className="col">
                      <button
                        className="btn btn-danger"
                        onClick={ handleDeleteNote }
                      >
                        Delete note
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

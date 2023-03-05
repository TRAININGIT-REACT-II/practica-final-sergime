import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../shared/components/Modal";
import useApi from "../../shared/hooks/useApi";
import { setNotes } from "../../store/slices/notes/notesSlice";

export const NotesPage = () => {
  const [showDeleteNoteModal, setShowDeleteNoteModal] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)

  const { notes } = useSelector( state => state.notes );
  const { user } = useSelector( state => state.user );
  const dispatch = useDispatch();

  // console.log(notes)

  const notesRequest = useApi("/api/notes", user.token, {}, false);
  
  // console.log('lsnotes', localStorage.getItem('notes'))
  // console.log('initnotes', notes)

  useEffect(() => {
    // console.log(notesRequest.data)
    if (notesRequest.data) {
      // console.log('notesRequest.data', notesRequest.data)
      dispatch(setNotes(notesRequest.data))
    }

  }, [notesRequest.data])
  
  useEffect(() => {
    if (!notes.length) {
      // console.log('no notes')
      notesRequest.updateParams({
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      notesRequest.perform();
    }
  }, [])
  
  const handleEditNoteClick = () => {

  }

  const handleDeleteNoteClick = () => {
    openModal()
  }

  const handleDeleteNote = (e) => {
    // console.log(e)
  }
  
  const openModal = () => setShowDeleteNoteModal(true);
  const closeModal = () => setShowDeleteNoteModal(false);

  return (
    <>
      <h1>Notes</h1>
      <Modal
        header="Borrar nota"
        show={showDeleteNoteModal}
        onClose={closeModal}
      >
        <p>¿Quieres borrar esta nota?</p>
        <div className="text-end">
          <button
            className="btn btn-light me-1"
            onClick={ closeModal }
          >
            Cancelar
          </button>
          <button
            className="btn btn-danger"
            onClick={ handleDeleteNote(selectedNote) }
          >
            Borrar
          </button>
        </div>
      </Modal>
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
                    <td className="col-1"># { note.id }</td>
                    <td className="col-2">{ note.title }</td>
                    <td className="col-4">{ note.content }</td>
                    <td className="col-1">{ note.author }</td>
                    <td  className="col">
                      <button
                        className="btn btn-primary"
                        onClick={ handleEditNoteClick }
                      >
                        Edit note
                      </button>
                    </td>
                    <td className="col">
                      <button
                        className="btn btn-danger"
                        onClick={ handleDeleteNoteClick }
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

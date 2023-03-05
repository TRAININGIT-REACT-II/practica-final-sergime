import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../../shared/components/Modal";
import useApi from "../../shared/hooks/useApi";
import { deleteNote, setNotes } from "../../store/slices/notes/notesSlice";

export const NotesPage = () => {
  const [showDeleteNoteModal, setShowDeleteNoteModal] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)

  const { notes } = useSelector( state => state.notes )
  const { user } = useSelector( state => state.user )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // console.log('notes', notes)

  const notesRequest = useApi("/api/notes", user.token, {}, false);
  const deleteNoteRequest = useApi("/api/notes/" + selectedNote?.id, user.token, {}, false);
  
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
  
  const handleEditNoteClick = (note) => {
    navigate('/notes-edit/' + note.id)
  }

  const handleDeleteNoteClick = (note) => {
    setSelectedNote(note)
    openModal()
  }

  const handleViewNoteClick = (note) => {
    navigate('/notes-view/' + note.id)
  }

  const handleDeleteNote = (note) => {
    // console.log(note)
    deleteNoteRequest.updateParams({
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      }
    })

    deleteNoteRequest.perform()
  }

  useEffect(() => {
    if (deleteNoteRequest.data) {
      dispatch(deleteNote(selectedNote))
      setShowDeleteNoteModal(false)
    }
  
  }, [deleteNoteRequest.data])
  
  
  
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
            onClick={ () => handleDeleteNote(selectedNote) }
          >
            Borrar
          </button>
        </div>
      </Modal>
      <div className="row">
        <div className="offset-1 col-10 table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr className="bg-dark text-white">
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Author</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                notes?.map(note => (
                  <tr key={ note.id }>
                    <td className="col-1">{ note.id }</td>
                    <td className="col-2">{ note.title }</td>
                    <td className="col-6">{ note.content }</td>
                    <td className="col-1">{
                      typeof note.author === 'object'
                        ? note.author.username
                        : note.author
                    }</td>
                    <td className="col-2 text-end">
                      <button
                        className="btn btn-success me-1"
                        onClick={ () => handleViewNoteClick(note) }
                      >
                        <i className="fa fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-primary me-1"
                        onClick={ () => handleEditNoteClick(note) }
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={ () => handleDeleteNoteClick(note) }
                      >
                        <i className="fa fa-trash-can"></i>
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

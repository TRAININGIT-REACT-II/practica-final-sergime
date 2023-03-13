import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../shared/components/Modal";
import { DISPLAY } from "../../shared/constants/display";
import { ConfigContext } from "../../shared/context/configContext";
import useApi from "../../shared/hooks/useApi";
import { deleteNote, setNotes } from "../../store/slices/notes/notesSlice";
import { NotesCardContainer } from "../components/NotesCardContainer";
import { NotesTable } from "../components/NotesTable";

export const NotesPage = () => {
  const { configState } = useContext(ConfigContext)

  const [showDeleteNoteModal, setShowDeleteNoteModal] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)

  const { notes } = useSelector( state => state.notes )
  const { user } = useSelector( state => state.user )
  const dispatch = useDispatch()


  const notesRequest = useApi("/api/notes", user.token, {}, false);
  const deleteNoteRequest = useApi("/api/notes/" + selectedNote?.id, user.token, {}, false);
  

  useEffect(() => {
    if (notesRequest.data) {
      dispatch(setNotes(notesRequest.data))
    }

  }, [notesRequest.data])
  
  useEffect(() => {
    if (!notes.length) {
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

  const handleDeleteNoteClick = (note) => {
    setSelectedNote(note)
    openModal()
  }

  const handleDeleteNote = () => {
    if(selectedNote.id) {
      deleteNoteRequest.updateParams({
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        }
      })
  
      deleteNoteRequest.perform()
    }
  }

  useEffect(() => {
    if (deleteNoteRequest.data) {
      dispatch(deleteNote(selectedNote))
      setShowDeleteNoteModal(false)
      deleteNoteRequest.reinit()
    }
  
  }, [deleteNoteRequest.data])
    
  const openModal = () => setShowDeleteNoteModal(true);
  const closeModal = () => setShowDeleteNoteModal(false);

  return (
    <>
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
            onClick={ handleDeleteNote }
          >
            Borrar
          </button>
        </div>
      </Modal>
      <div className="row mt-2">
        {
          configState.display === DISPLAY.TABLE
            ?
              <NotesTable
                notes={ notes }
                handleDeleteNoteClick={ handleDeleteNoteClick }
              />
            :
              <NotesCardContainer
                notes={ notes }
                handleDeleteNoteClick={ handleDeleteNoteClick }
              />
        }
      </div>
    </>
  )
}

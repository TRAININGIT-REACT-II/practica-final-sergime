import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import useApi from "../../shared/hooks/useApi"
import { useForm } from "../../shared/hooks/useForm"
import { updateNote } from "../../store/slices/notes/notesSlice"

export const EditNotePage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null)

  const { user } = useSelector( state => state.user )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialForm = {
    title: '',
    content: '',
  }
  const [formValues, handleInputChange] = useForm(initialForm)

  const getNoteRequest = useApi('/api/notes/' + id, user.token, {}, false)
  const updateNoteRequest = useApi('/api/notes/' + id, user.token, {}, false)

  useEffect(() => {
    // console.log('getNoteRequest.data1', getNoteRequest.data)
    if (getNoteRequest.data) {
      const noteData = getNoteRequest.data
      setNote(noteData)
      formValues.title = noteData.title,
      formValues.content = noteData.content
    }

  }, [getNoteRequest.data])

  useEffect(() => {
    // console.log('notes', notes)
    getNoteRequest.updateParams({
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    getNoteRequest.perform()
  }, [])
  

  const handleEditNote = () => {
    updateNoteRequest.updateParams({
      method: 'PUT',
      body: JSON.stringify(formValues),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    updateNoteRequest.perform()
  }

  useEffect(() => {
    // console.log('updateNoteRequest.data1', updateNoteRequest.data)
    if (updateNoteRequest.data) {
      dispatch(updateNote(updateNoteRequest.data))
      navigate("/notes")
    }
  }, [updateNoteRequest.data])

  return (
    <div className="row mt-3">
      <div className="offset-3 col-6">
        <form>
          <div>Add Note</div>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="form-control"
              value={ formValues.title }
              onChange={ handleInputChange }
            />
          </div>

          <div className="form-outline mb-4">
            <input
              type="text"
              id="content"
              name="content"
              placeholder="Content"
              className="form-control"
              value={ formValues.content }
              onChange={ handleInputChange }
            />
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block mb-4"
            onClick={ handleEditNote }
          >
            Editar
          </button>
        </form>
      </div>
    </div>
  )
}

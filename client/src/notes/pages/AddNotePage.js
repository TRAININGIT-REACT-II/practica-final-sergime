import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useApi from "../../shared/hooks/useApi"
import { useForm } from "../../shared/hooks/useForm"
import { createNote } from "../../store/slices/notes/notesSlice"

export const AddNotePage = () => {

  const { user } = useSelector( state => state.user )
  const { notes } = useSelector( state => state.notes )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addNoteRequest = useApi('/api/notes', user.token, {}, false)

  const initialForm = {
    title: '',
    content: '',
    author: '',
  }
  const [formValues, handleInputChange] = useForm(initialForm)


  const handleAddNote = () => {
    const note = {
      title: formValues.title,
      content: formValues.content,
      author: user.username,
    }

    addNoteRequest.updateParams({
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })

    addNoteRequest.perform()
  }

  useEffect(() => {
    const note = addNoteRequest.data
    console.log('newnote', addNoteRequest.data)
    if (note) {
      dispatch(createNote(note))
      navigate("/notes")
    }
  }, [addNoteRequest.data])
  

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
            onClick={ handleAddNote }
          >
            Add note
          </button>
        </form>
      </div>
    </div>
  )
}

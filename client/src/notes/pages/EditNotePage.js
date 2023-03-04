import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useForm } from "../../shared/hooks/useForm"
import { createNote } from "../../store/slices/notes/notesSlice"

export const EditNotePage = () => {

  const { user } = useSelector( state => state.user )
  const { notes } = useSelector( state => state.notes )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialForm = {
    title: '',
    content: '',
    author: '',
  }
  const [formValues, handleInputChange] = useForm(initialForm)


  const handleEditNote = () => {
    const note = {
      title: formValues.title,
      content: formValues.content,
      author: user.username,
    }
    dispatch(createNote(note))
    localStorage.setItem('notes', JSON.stringify({
      ...notes,
      note,
    }))
    navigate("/notes")
  }

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
            Edit note
          </button>
        </form>
      </div>
    </div>
  )
}

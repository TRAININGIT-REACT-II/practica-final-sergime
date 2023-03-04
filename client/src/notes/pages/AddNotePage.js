import React from 'react'
import { useForm } from "../../shared/hooks/useForm"

export const AddNotePage = () => {

  const initialForm = {
    title: '',
    content: '',
    author: '',
  }
  const [formValues, handleInputChange] = useForm(initialForm)


  const handleAddNote = () => {

  }

  return (
    <>
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
    </>
  )
}

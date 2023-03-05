import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import useApi from "../../shared/hooks/useApi"
import { useForm } from "../../shared/hooks/useForm"

export const ViewNotePage = () => {
  const { id } = useParams()
  const { user } = useSelector( state => state.user )
  const { notes } = useSelector( state => state.notes )
  const navigate = useNavigate()

  const initialForm = {
    title: '',
    content: '',
  }
  const [formValues, handleInputChange] = useForm(initialForm)

  const getNoteRequest = useApi('/api/notes/' + id, user.token, {}, false)

  useEffect(() => {
    // console.log('getNoteRequest.data1', getNoteRequest.data)
    if (getNoteRequest.data) {
      const noteData = getNoteRequest.data
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

  const handleReturn = () => {
    navigate('/notes')
  }

  return (
    <div className="row mt-3">
      <div className="offset-3 col-6">
        <form>
          <h4>Ver Nota</h4>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="form-control"
              value={ formValues.title }
              readOnly
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
              readOnly
            />
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block mb-4"
            onClick={ handleReturn }
          >
            Volver
          </button>
        </form>
      </div>
    </div>
  )
}

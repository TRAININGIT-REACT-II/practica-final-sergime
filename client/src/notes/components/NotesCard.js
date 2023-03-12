import React from 'react'
import { useNavigate } from "react-router-dom"
import { shortenText } from "../helpers/shortenText"

export const NotesCard = ({ note, handleDeleteNoteClick}) => {

  const navigate = useNavigate()
  
  const handleEditNoteClick = (note) => {
    navigate('/notes-edit/' + note.id)
  }
  
  const handleViewNoteClick = (note) => {
    navigate('/notes-view/' + note.id)
  }

  return (
    <div className="col">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">{ shortenText(note.title, 30) }</h5>
        </div>
        <div className="card-body">
          <p className="card-text">{ shortenText(note.content, 30) }</p>
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
        </div>
      </div>
    </div>
  )
}

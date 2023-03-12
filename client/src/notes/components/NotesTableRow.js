import React from 'react'
import { useNavigate } from "react-router-dom"
import { shortenText } from "../helpers/shortenText"

export const NotesTableRow = ({ note, handleDeleteNoteClick }) => {

  const navigate = useNavigate()
  
  const handleEditNoteClick = (note) => {
    navigate('/notes-edit/' + note.id)
  }
  
  const handleViewNoteClick = (note) => {
    navigate('/notes-view/' + note.id)
  }
  
  return (
    <tr key={ note.id }>
      <td className="col-1">{ note.id }</td>
      <td className="col-2">{ shortenText(note.title, 30) }</td>
      <td className="col-6">{ shortenText(note.content, 30) }</td>
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
  )
}

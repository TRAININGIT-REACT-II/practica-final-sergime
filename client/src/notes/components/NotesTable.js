import React from 'react'
import { NotesTableRow } from "./NotesTableRow"

export const NotesTable = ({ notes, handleDeleteNoteClick }) => {
  return (
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
              <NotesTableRow
                note={ note }
                handleDeleteNoteClick={ handleDeleteNoteClick }
                key={ note.id }
              />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

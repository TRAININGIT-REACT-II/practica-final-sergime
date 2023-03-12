import React from 'react'
import { NotesCard } from "./NotesCard"

export const NotesCardContainer = ({ notes, handleDeleteNoteClick }) => {
  return (
    <div className="row row-cols-4 g-4">
      {
        notes?.map(note => (
          <NotesCard
            note={ note }
            handleDeleteNoteClick={ handleDeleteNoteClick }
            key={ note.id }
          />
        ))
      }
    </div>
  )
}

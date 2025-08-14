import { NoteCard } from "./NoteCard";
import "./NotesGridCard.css"

export function NotesGrid({ notes, openModal, deleteMe }) {
  return (
    <div className="notes-grid">
      {notes.map((note, index) => (
        <NoteCard
          key={index}
          note={note}
          index={index}
          openModal={openModal}
          deleteMe={deleteMe}
        />
      ))}
    </div>
  );
}

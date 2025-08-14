import { NoteCard } from "./NoteCard";

export function NotesGrid({ notes, openModal, deleteMe, categories }) {
  return (
    <div className="notes-grid">
      {notes.map((note, index) => (
        <NoteCard
          key={note.id || index}
          note={note}
          index={index}
          openModal={openModal}
          deleteMe={deleteMe}
          categories={categories}
        />
      ))}
    </div>
  );
}

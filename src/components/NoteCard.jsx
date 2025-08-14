import "./NotesGridCard.css"

export function NoteCard({ note, index, openModal, deleteMe }) {
  return (
    <div className="note-card" onClick={() => openModal(note, index)}>
      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation();
          deleteMe(index);
        }}
      >
        x
      </button>
      <small>{note.date}</small>
      {note.titleText && <h3>{note.titleText}</h3>}
      <h4>{note.text}</h4>
    </div>
  );
}

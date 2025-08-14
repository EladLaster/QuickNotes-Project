import { useState, useRef } from "react";
import { NoteForm } from "./components/NoteForm";
import { NotesGrid } from "./components/NotesGrid";
import { NoteModal } from "./components/NoteModal";

function App() {
  const [titleText, setTitleText] = useState("");
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");

  const textAreaRef = useRef(null);

  const send = () => {
    if (text.trim() === "") return;
    const newNote = {
      titleText,
      text,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };
    setNotes((prev) => [...prev, newNote]);
    setText("");
    setTitleText("");
  };

  const openModal = (note, index) => {
    setSelectedNote({ ...note, index });
    setModalTitle(note.titleText);
    setModalText(note.text);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedNote(null);
  };

  const handleUpdate = () => {
    if (!selectedNote) return;
    setNotes((prevNotes) =>
      prevNotes.map((note, i) =>
        i === selectedNote.index
          ? { ...note, titleText: modalTitle, text: modalText }
          : note
      )
    );
    closeModal();
  };

  const deleteMe = (index) => {
    if (window.confirm("Are you sure you want to delete your note?")) {
      setNotes((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <>
    <div className="app-container">
      <NoteForm
        titleText={titleText}
        setTitleText={setTitleText}
        text={text}
        setText={setText}
        send={send}
        textAreaRef={textAreaRef}
      />
      {notes.length > 0 && (
          <NotesGrid notes={notes} openModal={openModal} deleteMe={deleteMe} />
      )}
      <NoteModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        selectedNote={selectedNote}
        modalTitle={modalTitle}
        setModalTitle={setModalTitle}
        modalText={modalText}
        setModalText={setModalText}
        handleUpdate={handleUpdate}
      />
    </div>
    </>
  );
}

export default App;

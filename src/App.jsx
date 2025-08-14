
import { useState, useRef, useEffect } from "react";
import { NoteForm } from "./components/NoteForm";
import { NotesGrid } from "./components/NotesGrid";
import { NoteModal } from "./components/NoteModal";
import { NotesFilter } from "./components/NotesFilter";
import Modal from "react-modal";

Modal.setAppElement("#root");

const categories = {
  Personal: "lightblue",
  Work: "lightgreen",
  Shopping: "lightyellow"
};

function App() {
  const [titleText, setTitleText] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Personal");
  const [notes, setNotes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [modalCategory, setModalCategory] = useState("Personal");
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");


  const textAreaRef = useRef(null);
  const categoryRef = useRef(null);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const send = () => {
    if (text.trim() === "") return;
    const newNote = {
      id: Date.now(),
      titleText,
      text,
      category,
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
    setCategory("Personal");
  };

  const openModal = (note, index) => {
    setSelectedNote({ ...note, index });
    setModalTitle(note.titleText);
    setModalText(note.text);
    setModalCategory(note.category);
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
          ? { ...note, titleText: modalTitle, text: modalText, category: modalCategory }
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

  const filteredNotes = notes.filter((note) => {
  const matchesSearch =
    note.titleText.toLowerCase().includes(searchText.toLowerCase()) ||
    note.text.toLowerCase().includes(searchText.toLowerCase());

  const matchesCategory = activeFilter === "All" || note.category === activeFilter;

  return matchesSearch && matchesCategory;
});


  return (
    <>
      <div className="app-container">
        <NoteForm
          titleText={titleText}
          setTitleText={setTitleText}
          text={text}
          setText={setText}
          category={category}             
          setCategory={setCategory}        
          send={send}
          textAreaRef={textAreaRef}
          categoryRef={categoryRef}
          categories={categories}          
        />
        <NotesFilter
          categories={categories}
          searchText={searchText}
          setSearchText={setSearchText}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {filteredNotes.length > 0 && (
          <NotesGrid
            notes={filteredNotes}
            openModal={openModal}
            deleteMe={deleteMe}
            categories={categories}
          />
        )}

        {/* {notes.length > 0 && (
          <NotesGrid notes={notes} openModal={openModal} deleteMe={deleteMe} categories={categories} />
        )} */}
        <NoteModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          selectedNote={selectedNote}
          modalTitle={modalTitle}
          setModalTitle={setModalTitle}
          modalText={modalText}
          setModalText={setModalText}
          modalCategory={modalCategory}
          setModalCategory={setModalCategory}
          handleUpdate={handleUpdate}
          categories={categories}           
        />
      </div>
    </>
  );
}

export default App;

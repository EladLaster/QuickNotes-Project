import Modal from "react-modal";
import "./NoteModal.css"

export function NoteModal({
  modalIsOpen,
  closeModal,
  selectedNote,
  modalTitle,
  setModalTitle,
  modalText,
  setModalText,
  modalCategory,
  setModalCategory,
  handleUpdate,
  categories
}) {
  
  
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Note Modal"
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      {selectedNote && (
        <div className="modal-content">
          <button className="modal-close-button" onClick={closeModal}>
            x
          </button>
          <input
            type="text"
            value={modalTitle}
            onChange={(e) => setModalTitle(e.target.value)}
          />
          <textarea
            value={modalText}
            onChange={(e) => setModalText(e.target.value)}
          />
          <small>{selectedNote.date}</small>
          <label>Category:</label>
          <select value={modalCategory} onChange={(e) => setModalCategory(e.target.value)}>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </Modal>
  );
}

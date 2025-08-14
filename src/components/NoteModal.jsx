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
  handleUpdate
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
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </Modal>
  );
}

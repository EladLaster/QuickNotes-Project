import "./NoteForm.css"

export function NoteForm({ titleText, setTitleText, text, setText, send, textAreaRef }) {

    
  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      textAreaRef.current.focus();
    }
  };
  
  const handleTextKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="container">
      <input
        placeholder="title..."
        value={titleText}
        onChange={(e) => setTitleText(e.target.value)}
        onKeyDown={handleTitleKeyDown}
      />
      <textarea
        className="textArea"
        rows="10"
        cols="50"
        placeholder="write here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleTextKeyDown}
        ref={textAreaRef}
      />
      <br />
      <button className="send-button" onClick={send}>
        Add
      </button>
    </div>
  );
}

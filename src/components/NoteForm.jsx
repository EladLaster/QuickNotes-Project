import "./NoteForm.css"

export function NoteForm({ titleText, setTitleText, text, setText,category,setCategory, send, textAreaRef,categoryRef,categories }) {

    
  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      textAreaRef.current.focus();
    }
  };

  const handleTextKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    categoryRef.current.focus();
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
      <label>Category:</label>
      <select value={category}
       onChange={(e) => setCategory(e.target.value)}
       ref={categoryRef} 
       >
        {Object.keys(categories).map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <br />
      <button className="send-button" onClick={send}>
        Add
      </button>
    </div>
  );
}

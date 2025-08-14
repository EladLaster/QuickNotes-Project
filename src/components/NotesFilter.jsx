import "./NotesFilter.css"

export function NotesFilter({ categories, searchText, setSearchText, activeFilter, setActiveFilter }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="filter-buttons">
        <button
          onClick={() => setActiveFilter("All")}
          className={activeFilter === "All" ? "active" : ""}
        >
          All
        </button>
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={activeFilter === cat ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

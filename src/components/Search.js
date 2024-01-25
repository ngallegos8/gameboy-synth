import React from "react";

function Search({ search, setSearch }) {
  // console.log("searching" + search)


  return (
    <div className="searchbar">
      <label htmlFor="search">Search Presets:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;

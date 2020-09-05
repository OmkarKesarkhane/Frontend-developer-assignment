import React, { useState } from "react";

function Search({ handleSearch }) {
  const [query, setQuery] = useState();
  const [selected, setSelected] = useState("id");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  if (query !== null && query !== undefined) {
    handleSearch(query, selected);
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <select value={selected} onChange={(e) => handleSelect(e)}>
          <option value="date">Date</option>
          <option value="id">Order-Id</option>
        </select>
        <input value={query} onChange={(e) => setQuery(e.target.value)}></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Search;

import React, { useState } from 'react';

const MangaSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch({ searchTerm: e.target.value, selectedGenre: "" });
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
    </form>
  );
};

export default MangaSearch;

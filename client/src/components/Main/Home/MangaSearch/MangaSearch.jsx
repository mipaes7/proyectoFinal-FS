import { useState } from "react";
import { DebounceInput } from 'react-debounce-input';

const MangaSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch({ searchTerm: e.target.value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({ searchTerm });
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <DebounceInput
        minLength={2}
        debounceTimeout={3000}
        placeholder="Search by keyword"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <button type="submit">
        Search
      </button>
    </form>
  );
};

export default MangaSearch;

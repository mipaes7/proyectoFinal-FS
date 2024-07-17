import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';


const MangaGenreFilter = ({ genres, onGenreSelect }) => {
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    onGenreSelect(e.target.value);
  };

  return (
    <select value={selectedGenre} onChange={handleGenreChange}>
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={uuidv4()} value={genre.name}>
          {genre.name}
        </option>
      ))}
    </select>
  );
};

export default MangaGenreFilter;

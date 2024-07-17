import { useContext, useEffect, useState } from "react";
import { MangaContext } from "../../../../context/mangaContext";
import { v4 as uuidv4 } from 'uuid';
import  MangaCard  from './MangaCard';
import MangaSearch from "../MangaSearch";
import MangaGenreFilter from "../MangaGenreFilter/MangaGenreFilter";

import { getMangas } from "../../../../services/mangas";
import { getGenres } from "../../../../services/mangas";

const MangaList = () => {

  const [mangas, setMangas] = useContext(MangaContext);
  const [searchParams, setSearchParams] = useState({ searchTerm: "", selectedGenre: "" });
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getMangaData = async () => {
      try {
        const fetchedMangas = await getMangas();
        setMangas(fetchedMangas);
        const fetchedGenres = await getGenres();
        setGenres(fetchedGenres);
      } catch (e) {
        setMangas([]);
        setGenres([]);
      }
    }
    getMangaData();
  }, [setMangas]);

  const handleSearch = (params) => {
    setSearchParams({ ...searchParams, ...params });
  };

  const handleGenreSelect = (genre) => {
    setSearchParams({ ...searchParams, selectedGenre: genre });
  };

  const filteredMangas = mangas.filter((manga) => {
    const { searchTerm, selectedGenre } = searchParams;
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    const matchesTitle = manga.title.toLowerCase().includes(lowercasedSearchTerm);
    const matchesAuthor = manga.authors.some((author) =>
      author.name.toLowerCase().includes(lowercasedSearchTerm)
    );
    const matchesGenre = selectedGenre === "" || manga.genres.some((genre) =>
      genre.name.toLowerCase() === selectedGenre.toLowerCase()
    );

    return (matchesTitle || matchesAuthor) && matchesGenre;
  });

  const renderMangaCard = () => {
    return filteredMangas.map((manga) => (
      <MangaCard
        key={uuidv4()}
        manga={manga}
        mangaCover={manga.images.jpg}
      />
    ));
  };

  return <section>
    <MangaSearch onSearch={handleSearch} />
    <MangaGenreFilter genres={genres} onGenreSelect={handleGenreSelect} />
    <article>
    {mangas.length !== 0 ? renderMangaCard() : <p>Loading...</p>}
    </article>
  </section>;
};

export default MangaList;

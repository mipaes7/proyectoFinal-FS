import { useContext, useEffect, useState } from "react";
import { MangaContext } from "../../../../context/mangaContext";
import { v4 as uuidv4 } from 'uuid';
import MangaCard from './MangaCard';
import MangaSearch from "../MangaSearch";
import MangaListPagination from "../MangaListPagination/MangaListPagination";
import { getMangas } from "../../../../services/mangas";

const MangaList = () => {
  const [mangas, setMangas] = useContext(MangaContext);
  const [searchParams, setSearchParams] = useState({ searchTerm: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const mangasPerPage = 15;

  useEffect(() => {
    const getMangaData = async () => {
      try {
        const { searchTerm } = searchParams;
        const fetchedMangas = await getMangas(currentPage, mangasPerPage, searchTerm);
        
        setMangas(fetchedMangas.data);
        setTotalPages(fetchedMangas.pagination.last_visible_page);

      } catch (e) {

        console.error(e);
        setMangas([]);

      }
    };
    getMangaData();
  }, [searchParams, currentPage]); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleSearch = (params) => {
    setSearchParams({ ...searchParams, ...params });
    setCurrentPage(1); 
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderMangaCard = () => {
    return mangas.map((manga) => (
      <MangaCard
        key={uuidv4()}
        manga={manga}
        mangaCover={manga.images.jpg}
      />
    ));
  };

  return (
    <section className="searchAndListContainer">
      <MangaSearch onSearch={handleSearch} />
      <article className="cardsContainer">
        {mangas.length > 0 ? renderMangaCard() : <p>Loading...</p>}
      </article>
      <MangaListPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default MangaList;
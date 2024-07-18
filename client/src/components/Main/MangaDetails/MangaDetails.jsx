import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getMangaById } from "../../../services/mangas";

const MangaDetails = () => {

  const { id } = useParams();

  const [manga, setManga] = useState(null);

  useEffect(() => {
    const getMangaDetails = async () => {
      try {
        const fetchedManga = await getMangaById(id);
        console.log(fetchedManga);
        setManga(fetchedManga);
      } catch (error) {
        console.log('error', error)
      }
    };

    getMangaDetails();

  }, [id]);

  if (!manga) {
    return <p>Loading...</p>;
  }


  return (
    <div className="mangaDetails">
      <div className="mangaHeader" style={{ backgroundImage: `url(${manga.images.jpg.large_image_url})`, borderRadius: '8px' }}>
        <aside className="titleContainer">
        <h1 className="mangaTitle">{manga.title}</h1>
        <h4>{manga.title_japanese}</h4>
        <h2 className="mangaAuthor">{manga.authors.map(author => author.name).join(', ')}</h2>
        </aside>
      </div>
      <div className="mangaContent">
        <div className="mangaCover" style={{ backgroundImage: `url(${manga.images.jpg.large_image_url})` }}></div>
        <div className="mangaInfo">
          <div className="mangaMetadata">
            <p><strong>Genres:</strong> {manga.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>Themes:</strong> {manga.themes.map(theme => theme.name).join(', ')}</p>
            <p><strong>Demographic:</strong> {manga.demographics.map(demographic => demographic.name).join(', ')}</p>
            <p><strong>Status:</strong> {manga.status}</p>
          </div>
          <button className="addToLibraryButton">Add to Library</button>
        </div>
      </div>
      <div className="mangaSynopsis">
        <p>{manga.synopsis}</p>
      </div>
    </div>
  );
};

export default MangaDetails;

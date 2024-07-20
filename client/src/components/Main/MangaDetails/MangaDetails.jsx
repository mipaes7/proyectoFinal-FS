import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getMangaById } from "../../../services/mangas";

const MangaDetails = ({ onAddToLibrary }) => {

  const { id } = useParams();

  const [manga, setManga] = useState(null);

  useEffect(() => {
    const getMangaDetails = async () => {
      try {
        const fetchedManga = await getMangaById(id);
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

  const normalizeAuthor = (data) => {
    return data.map(author => {
      const [lastName, firstName] = author.name.split(', ');
      return `${firstName} ${lastName}`;
  }).join(', ');
  };


  return (
    <div className="mangaDetails">
      <div className="mangaHeader" style={{ backgroundImage: `url(${manga.images.jpg.large_image_url})`, borderRadius: '8px' }}>
        <aside className="titleContainer">
          <h1 className="mangaTitle">{manga.title}</h1>
          <h4>{manga.title_japanese}</h4>
          <h2 className="mangaAuthor">{normalizeAuthor(manga.authors)}</h2>
        </aside>
      </div>
      <div className="mangaDetailsBody">
        <div className="mangaContent">
          <div className="mangaCover" style={{ backgroundImage: `url(${manga.images.jpg.large_image_url})` }}></div>
          <div className="mangaInfo">
            <div className="mangaMetadata">
              <p><strong>Genres:</strong> {manga.genres.map(genre => genre.name).join(', ')}</p>
              {manga.themes.length !== 0 ? <p><strong>Themes:</strong> {manga.themes.map(theme => theme.name).join(', ')}</p> : ''}
              {manga.demographics.length !== 0 ? <p><strong>Demographic:</strong> {manga.demographics.map(demographic => demographic.name).join(', ')}</p> : ''}
              <p><strong>Status:</strong> {manga.status}</p>
              <p><strong>{"\u{02606}"}MAL Rating:</strong> {manga.score} ({manga.scored_by} users)</p>
            </div>
            <button onClick={() => onAddToLibrary(manga)} className="addToLibraryButton">Add to Library</button>
          </div>
        </div>
        <div className="mangaSynopsis">
          <p>{manga.synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default MangaDetails;

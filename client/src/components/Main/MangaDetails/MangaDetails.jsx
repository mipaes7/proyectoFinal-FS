import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MangaDetails = ({ user, setLibrary }) => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);

  useEffect(() => {
    const getMangaDetails = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/manga/${id}`);
        setManga(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getMangaDetails();
  }, [id]);

  const formatAuthorName = (data) => {
    return data.map(author => {
      const [lastName, firstName] = author.name.split(', ');
      return `${firstName} ${lastName}`;
    }).join(', ');
  };

  const handleAddToLibrary = async () => {
    if (!user) {
      alert("Please login to add to library");
      return;
    }

    try {

      const mangaExists = await axios.get(`http://localhost:3000/api/mangas/title/${manga.title}`);

      if (!mangaExists) {
        await axios.post('http://localhost:3000/api/mangas', {
          title: manga.title,
          author: formatAuthorName(manga.authors),
          synopsis: manga.synopsis,
          cover_image_url: manga.images.jpg.large_image_url,
          genres: manga.genres.length !== 0 ? manga.genres.map(genre => genre.name).join(', ') : null,
          themes: manga.themes.length !== 0 ? manga.themes.map(theme => theme.name).join(', ') : null
        }); 
      }

      await axios.post('http://localhost:3000/api/libraries', {
        email: user.email,
        title: manga.title,
        status: 'Plan to Read'
      });

      setLibrary((prevLibrary) => ({
        ...prevLibrary,
        planToRead: [...prevLibrary.planToRead, { ...manga, status: 'Plan to Read' }]
      }));

      alert("Manga added to library");
    } catch (error) {
      console.error("Error adding manga to library", error);
      alert("Failed to add manga to library");
    }
  };

  return (
    manga ? (
      <div className="mangaDetails">
        <div className="mangaHeader" style={{ backgroundImage: `url(${manga.images.jpg.large_image_url})`}}>
          <aside className="titleContainer">
            <h1 className="mangaTitle">{manga.title}</h1>
            <h4>{manga.title_japanese}</h4>
            <h2 className="mangaAuthor">{formatAuthorName(manga.authors)}</h2>
          </aside>
        </div>
        <div className="mangaContent">
          <div className="mangaCover" style={{ backgroundImage: `url(${manga.images.jpg.large_image_url})` }}></div>
          <div className="mangaInfo">
            <div className="mangaMetadata">
              <p><strong>Genres:</strong> {manga.genres.map(genre => genre.name).join(', ')}</p>
              {manga.themes.length !== 0 ? <p><strong>Themes:</strong> {manga.themes.map(theme => theme.name).join(', ')}</p> : ''}
              {manga.demographics.length !== 0 ? <p><strong>Demographic:</strong> {manga.demographics.map(demographic => demographic.name).join(', ')}</p> : ''}
              <p><strong>Status:</strong> {manga.status}</p>
              <p><strong>Volumes:</strong> {manga.volumes}</p>
              <p><strong>Chapters:</strong> {manga.chapters}</p>
              <p><strong>MAL Rating:</strong> {manga.score} (Votes:{manga.scored_by})</p>
            </div>
            <button onClick={handleAddToLibrary} className="addToLibraryButton">Add to Library</button>
          </div>
        </div>
        <div className="mangaSynopsis">
          <p>{manga.synopsis}</p>
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    )
  );
};

export default MangaDetails;

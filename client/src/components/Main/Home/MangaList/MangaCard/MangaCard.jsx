import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const MangaCard = ({
  manga: {title, synopsis, mal_id},
  mangaCover: {large_image_url}
}) => {

  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/manga/${mal_id}`);
  };

  return <article
   className="mangaCard"
   onMouseEnter={() => setIsHovered(true)}
   onMouseLeave={() => setIsHovered(false)}>
    <div 
    className="mangaCover"
    style={{backgroundImage: `url(${large_image_url})`}}>
      {isHovered && (
        <div className="mangaSynopsis">
          <p>{synopsis}</p>
          <aside className="title-button-container">
          <h3>{title}</h3>
          <button onClick={handleClick}>{"\u{0279C}"}</button>
          </aside>
        </div>
      )}
    </div>
  </article>;
};

export default MangaCard;

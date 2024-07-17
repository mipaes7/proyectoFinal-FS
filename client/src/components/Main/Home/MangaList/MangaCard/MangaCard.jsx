import React from "react";

const MangaCard = ({
  manga: {title_english},
  mangaCover: {large_image_url}
}) => {
  return <article className="mangaCard">
    <div>
      <img src={large_image_url} alt={title_english} />
    </div>
    <h3>{title_english}</h3>
  </article>;
};

export default MangaCard;

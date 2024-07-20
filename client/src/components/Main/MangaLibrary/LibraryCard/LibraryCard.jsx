import React from 'react';

const LibraryCard = ({ manga }) => {
  return (
    <div className="libraryCard">
      <h3 className="mangaTitle">{manga.title}</h3>
      <p className="mangaStatus">{manga.status}</p>
    </div>
  );
};

export default LibraryCard;

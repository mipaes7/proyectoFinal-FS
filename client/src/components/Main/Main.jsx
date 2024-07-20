import { useState } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Home from "./Home";
import MangaLibrary from "./MangaLibrary";
import MangaDetails from "./MangaDetails";

const Main = () => {

  const [library, setLibrary] = useState({
    planToRead: [],
    reading: [],
    finished: [],
    dropped: []
  });

  const handleAddToLibrary = (manga) => {
    setLibrary((prevLibrary) => ({
      ...prevLibrary,
      planToRead: [...prevLibrary.planToRead, { ...manga, id: uuidv4(), status: 'Plan to Read' }]
    }));
  };

  return <main>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/library' element={<MangaLibrary library={library}/>} />
      <Route path='/manga/:id' element={<MangaDetails onAddToLibrary={handleAddToLibrary}/>} />
      <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
  </main>;
};

export default Main;

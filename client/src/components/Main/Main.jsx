import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from "./Home";
import MangaLibrary from "./MangaLibrary";
import MangaDetails from "./MangaDetails";

const Main = () => {
  return <main>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/library' element={<MangaLibrary />} />
      <Route path='/manga/:id' element={<MangaDetails />} />
      <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
  </main>;
};

export default Main;

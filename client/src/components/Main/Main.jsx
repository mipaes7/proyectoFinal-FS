import { useState } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from "./Home";
import MangaLibrary from "./MangaLibrary";
import MangaDetails from "./MangaDetails";
import Login from "./Auth/Login";
import Register from "./Auth/Register"

const Main = ({ user, setUser }) => {

  const [library, setLibrary] = useState({
    planToRead: [],
    reading: [],
    finished: [],
    dropped: []
  });

  return (
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/library' element={<MangaLibrary library={library} setLibrary={setLibrary} />} />
        <Route path='/manga/:id' element={<MangaDetails user={user} setLibrary={setLibrary} />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/register' element={<Register setUser={setUser} />} />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
    </main>
  );
};

export default Main;

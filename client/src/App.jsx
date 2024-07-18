import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';

import { MangaContext } from './context/mangaContext';

function App() {

  const [mangas, setMangas] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <MangaContext.Provider value={[mangas, setMangas]}>
          <Main></Main>
        </MangaContext.Provider>
      </BrowserRouter>
      <Footer></Footer>
    </>
  )
}

export default App

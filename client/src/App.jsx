import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { MangaContext } from './context/mangaContext';

function App() {
  const [mangas, setMangas] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const email = Cookies.get('email');
    console.log("Cookies:", { token, email });
    if (token && email) {
      setUser({ token, email });
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header user={user} setUser={setUser} />
        <MangaContext.Provider value={[mangas, setMangas]}>
          <Main user={user} setUser={setUser} />
        </MangaContext.Provider>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;

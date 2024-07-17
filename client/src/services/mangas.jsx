import axios from 'axios';

export const getMangas = async () => {
    const res = await axios.get('https://api.jikan.moe/v4/manga');
    const json = res.data;
    // console.log(json.data);
    return json.data;
};

export const getGenres = async () => {
    const res = await axios.get('https://api.jikan.moe/v4/manga');
    const json = res.data;
  
    const allGenres = json.data
      .flatMap(manga => manga.genres)
      .reduce((acc, genre) => {
        if (!acc.some(g => g.mal_id === genre.mal_id)) {
          acc.push(genre);
        }
        return acc;
      }, []);
    
    return allGenres;
  };

getGenres();
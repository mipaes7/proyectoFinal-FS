import axios from 'axios';

export const getMangas = async (page = 1, limit = 10, searchTerm = '') => {
    if (searchTerm) {
      const res = await axios.get(`https://api.jikan.moe/v4/manga?q=${searchTerm}&page=${page}&limit=${limit}`);
      const json = res.data;
      return json;
    } else {
      const res = await axios.get(`https://api.jikan.moe/v4/top/manga?page=${page}&limit=${limit}`);
      const json = res.data;
      return json;
    }
};

export const getMangaById = async (id) => {
  const res = await axios.get(`https://api.jikan.moe/v4/manga/${id}`);
  const json = res.data.data;
  console.log(json);
  return json;
};

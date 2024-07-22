import axios from 'axios';

const API_URL = '/api/libraries';

export const addMangaToLibrary = async (entry) => {
    const response = await axios.post(API_URL, entry);
    return response.data;
};

export const updateLibraryEntry = async (entry) => {
    const response = await axios.put(API_URL, entry);
    return response.data;
};

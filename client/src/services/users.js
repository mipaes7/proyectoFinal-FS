import axios from 'axios';

const API_URL = '/api/users';

export const registerUser = async (userData) => {
    const response = await axios.post(API_URL, userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};

export const logoutUser = async () => {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
};

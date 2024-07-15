const pool = require('../config/db_pgsql');
const queries = require('../queries/manga.queries');

const getAllMangas = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllMangas);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const createManga = async (manga) => {
    const { title, author, synopsis, cover_image_url, genres, themes } = manga;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createManga, [title, author, synopsis, cover_image_url, genres, themes]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const updateManga = async (manga) => {
    const { synopsis, cover_image_url, genres, themes, title } = manga;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.updateManga, [synopsis, cover_image_url, genres, themes, title]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const deleteManga = async (title) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteManga, [title]);
        result = data.rowCount;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.release();
    }
    return result;
};

module.exports = {
    getAllMangas,
    createManga,
    updateManga,
    deleteManga
};

// getAllMangas().then(data => console.log(data));

// const newManga = {
//     title: 'Shigurui',
//     author: 'Norio Nanjo',
    // synopsis: 'Samurais',
    // cover_image_url: 'img.jpg',
    // genres: 'seinen',
    // themes: 'historic, samurai'
// }

// createManga(newManga).then(data => console.log(data));

// const modifiedManga = {
//     synopsis: 'Samurais',
//     cover_image_url: 'img.jpg',
//     genres: 'seinen',
//     themes: 'historic, samurai, gore',
//     title: 'Shigurui'
// }

// updateManga(modifiedManga).then(data => console.log(data));

// deleteManga('Example Manga Title').then(data => console.log(data));
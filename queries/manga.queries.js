const mangaQueries = {
    // Read All mangas
    getAllMangas: `
    SELECT title, author, synopsis, cover_image_url, genres, themes
    FROM manga;`,

    // Read manga by title
    getMangaByTitle: `
    SELECT title, author, synopsis, cover_image_url, genres, themes
    FROM manga
    WHERE title ILIKE $1;`,

    // Read manga by genre
    getMangaByGenre: `
    SELECT title, author, synopsis, cover_image_url, genres, themes
    FROM manga
    WHERE genres ILIKE $1;`,

    // Read manga by author
    getMangaByAuthor: `
    SELECT title, author, synopsis, cover_image_url, genres, themes
    FROM manga
    WHERE author ILIKE $1;`,

    // Create a new manga
    createManga: `
    INSERT INTO manga (title, author, synopsis, cover_image_url, genres, themes)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,

    // Update the manga information
    updateManga: `
    UPDATE manga
    SET
    title = COALESCE($1, title),
    author = COALESCE($2, author),
    synopsis = COALESCE($3, synopsis),
    cover_image_url = COALESCE($4, cover_image_url),
    genres = COALESCE($5, genres),
    themes = COALESCE($6, themes)
    WHERE title = $7;`,

    // Delete the manga
    deleteManga: `
    DELETE FROM manga
    WHERE 
        title = $1;`
};

module.exports = mangaQueries;

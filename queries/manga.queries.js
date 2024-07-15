const mangaQueries = {
    // Read All mangas
    getAllMangas: `
    SELECT title, author, synopsis, cover_image_url, genres, themes
    FROM manga;`,

    // Create a new manga
    createManga: `
    INSERT INTO manga (title, author, synopsis, cover_image_url, genres, themes)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,

    // Update the manga information
    updateManga: `
    UPDATE manga
    SET 
        title = $1,
        author = $2,
        synopsis = $3,
        cover_image_url = $4,
        genres = $5,
        themes = $6
    WHERE 
        manga_id = $7;`,

    // Delete the manga
    deleteManga: `
    DELETE FROM manga
    WHERE 
        manga_id = $1;`
};

module.exports = mangaQueries;

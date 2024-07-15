CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    isadmin boolean NOT NULL DEFAULT FALSE,
    islogged boolean NOT NULL DEFAULT FALSE,
);

CREATE TABLE manga (
    manga_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    synopsis TEXT,
    cover_image_url TEXT,
    genres VARCHAR(255),
    themes VARCHAR(255),
);

CREATE TABLE user_library (
    library_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    manga_id INTEGER NOT NULL REFERENCES manga(manga_id),
    status VARCHAR(50) CHECK (status IN ('Plan to Read', 'Reading', 'Finished', 'Dropped')),
    UNIQUE(user_id, manga_id)
);


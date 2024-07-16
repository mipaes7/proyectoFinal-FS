const mangaController = require('../controllers/manga.controller');
const router = require('express').Router();

// GET http://localhost:3000/api/mangas
router.get('/', mangaController.getAllMangasController);

// GET http://localhost:3000/api/mangas?author=norio
router.get('/author/:author', mangaController.getMangaByAuthorController);

// GET http://localhost:3000/api/mangas?genre=ecchi
router.get('/genre/:genre', mangaController.getMangaByGenreController);

// GET http://localhost:3000/api/mangas?title=shigurui
router.get('/title/:title', mangaController.getMangaByTitleController);

// PUT http://localhost:3000/api/mangas
router.put('/', mangaController.updateMangaController);

// DELETE http://localhost:3000/api/mangas?title=jonas@email.com
router.delete('/', mangaController.deleteMangaController);

module.exports = router;
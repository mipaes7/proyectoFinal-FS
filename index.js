const express = require("express");
const app = express(); // Inicializar servidor
const cors = require('cors');
const port = 3000;
// const path = require('path'); // Descomentar para usar jsdoc

//Importar middlewares
const morgan = require("./middlewares/morgan");

// Logger de Morgan
app.use(morgan(':method :url :status - :response-time ms :body'));

// Importar Rutas API
const usersRoutes = require('./routes/users.routes');
const mangasRoutes = require('./routes/manga.routes');


// Importar Rutas Web

app.use(express.json()); // Habilito recepción de JSON en servidor
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

//Rutas API
app.use('/api/users', usersRoutes);
app.use('/api/mangas', mangasRoutes);

//Rutas Web

const server = app.listen(port, () => { // Servidor está escuchando en este puerto variable port
    console.log(`Example app listening on http://localhost:${port}`);
});

module.exports = server;
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

// Importar Rutas Web

app.use(express.json()); // Habilito recepción de JSON en servidor
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Rutas API

//Rutas Web

const server = app.listen(port, () => { // Servidor está escuchando en este puerto variable port
    console.log(`Example app listening on http://localhost:${port}`);
});

module.exports = server;
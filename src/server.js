// Dependencias
require('./database')
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { routes } = require('./routes');
const { createAdmin } = require('./repositories/user-repository');
const compression = require('compression');

const server = express();
server.use(cors());
server.use(express.json({ limit: '200kb' }));
server.use(compression({ level: 6 }));
server.use(express.urlencoded({ extended: false }));

server.use((error, req, res, next) => {
    if (error.message === 'request entity too large') {
        return res.status(413).json({ message: 'Requisição maior que 100KB' });
    } else {
        next();
    }
});

server.use(routes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`API V2 running on port ${PORT}`));

createAdmin();



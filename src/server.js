// Dependencias
require('./database')
require('dotenv').config();

// Libs
const express = require('express');
const cors = require('cors');

// Routes
const { routes } = require('./routes');

// Server
const server = express();
server.use(cors());
server.use(express.json());
server.use(routes);

const PORT = process.env.PORT || 3000;


// Inicialização do servidor
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



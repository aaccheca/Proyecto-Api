const express = require('express');
const router = require('./routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api', router);

// simple health check
app.get('/', (req, res) => res.send('API en funcionamiento'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor escuchando en puerto ${port}`));
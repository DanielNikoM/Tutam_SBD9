const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./tools/logger');
const morganMiddleware = require('./middleware/middleware.logging'); 
const notes = require('./repositories/repository.note');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8463;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use(cors());
app.use(morganMiddleware);
app.use(helmet());

app.post('/notes', notes.addNotes);
app.get('/notes', notes.getAllNotes);
app.put('/notes/:id', notes.updateNotes);
app.delete('/notes/:id', notes.deleteNotes);

app.get("/api/status", (req, res) => {
    logger.info("Checking the API status: Everything is OK");
    res.status(200).send({
        status: "UP",
        message: "The API is up and running!"
    });
});

app.listen(port, () => {        
    logger.info(`🚀 Server is running and listening on port ${port}`); 
});

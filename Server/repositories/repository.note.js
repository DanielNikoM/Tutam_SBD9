const { Pool } = require("pg");
const logger = require('../tools/logger');

require("dotenv").config();

const pool = new Pool({

    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,

    ssl:{
        require: true,
    }
});

pool.connect()
    .then(() => {
        logger.info("🛢 Connected to PostgreSQL database account");
    })
    .catch((err) => {
        logger.error("Error connecting to database", err);
    });

async function addNotes(req, res) {
    const { title, content } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *',
            [title, content]
        );
        const newNote = result.rows[0];
        res.status(201).json(newNote);
    } catch (error) {
        logger.error("Error adding note:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getAllNotes(req, res) {
    try {
        const result = await pool.query('SELECT * FROM notes');
        const notes = result.rows;
        res.status(200).json(notes);
    } catch (error) {
        logger.error("Error getting all notes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function updateNotes(req, res) {
    const noteId = req.params.id;
    const { title, content } = req.body;

    try {
        const result = await pool.query(
            'UPDATE notes SET title=$1, content=$2, updated_at=NOW() WHERE id=$3 RETURNING *',
            [title, content, noteId]
        );
        const updatedNote = result.rows[0];
        res.status(200).json(updatedNote);
    } catch (error) {
        logger.error("Error updating note:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function deleteNotes(req, res) {
    const noteId = req.params.id;

    try {
        await pool.query('DELETE FROM notes WHERE id = $1', [noteId]);
        res.status(204).send();
    } catch (error) {
        logger.error("Error deleting note:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    addNotes,
    getAllNotes,
    updateNotes,
    deleteNotes,
    pool // Export the pool object for use in other modules
};

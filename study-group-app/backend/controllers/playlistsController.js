const sql = require('mssql');
const pool = require('../db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Get all playlists for a specific user
const getUserPlaylists = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.id;

    try {
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .query('SELECT * FROM Playlists WHERE userId = @userId');
        res.status(200).json({ playlists: result.recordset });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get playlist by ID
const getPlaylistById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Playlists WHERE id = @id');
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.status(200).json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new playlist
const createPlaylist = async (req, res) => {
    const { link, name } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.id;

    // Generate a random integer for the playlist ID
    const id = crypto.randomInt(1, 1000000);

    if (!link || !name) {
        return res.status(400).json({ message: 'Both link and name are required to create a playlist' });
    }

    try {
        await pool.request()
            .input('link', sql.VarChar, link)
            .input('name', sql.VarChar, name)
            .input('userId', sql.Int, userId)
            .input('id', sql.Int, id)
            .query('INSERT INTO Playlists (link, name, userId, id) VALUES (@link, @name, @userId, @id)');
        res.status(201).json({ message: `Playlist created successfully`, id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update playlist by ID
const updatePlaylist = async (req, res) => {
    const { id } = req.params;
    const { link, name } = req.body;

    try {
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Playlists WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        await pool.request()
            .input('id', sql.Int, id)
            .input('link', sql.VarChar, link)
            .input('name', sql.VarChar, name)
            .query('UPDATE Playlists SET link = @link, name = @name WHERE id = @id');

        res.status(200).json({ message: `Playlist ${id} updated successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete playlist by ID
const deletePlaylist = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Playlists WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Playlists WHERE id = @id');

        res.status(200).json({ message: `Playlist ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getUserPlaylists,
    getPlaylistById,
    createPlaylist,
    updatePlaylist,
    deletePlaylist
};
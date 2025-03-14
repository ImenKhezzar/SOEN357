const sql = require('mssql');
const pool  = require('../db');
const jwt = require('jsonwebtoken');

// Get all study rooms
const getStudyRooms = async (req, res) => {
    try {
        const result = await pool.request().query('SELECT * FROM StudyRooms');
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get study room by ID
const getStudyRoomById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM StudyRooms WHERE id = @id');
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Study room not found' });
        }
        res.status(200).json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new study room
const createStudyRoom = async (req, res) => {
    const { name, type } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.id;

   

    console.log(userId);

    if (!name || !type || !userId) {
        return res.status(400).json({ message: 'Name, type, and userId are required' });
    }

    try {
        const result = await pool.request()
            .input('name', sql.VarChar, name)
            .input('type', sql.VarChar, type)
            .input('creatorId', sql.Int, userId)
            .query('INSERT INTO StudyRooms (name, type, creatorId) OUTPUT INSERTED.id VALUES (@name, @type, @creatorId)');

        const studyRoomId = result.recordset[0].id;

        await pool.request()
            .input('userId', sql.Int, userId)
            .input('studyRoomId', sql.Int, studyRoomId)
            .input('creatorId', sql.Int, userId)
            .query('INSERT INTO Users_StudyRooms (userId, studyRoomId, creatorId) VALUES (@userId, @studyRoomId, @creatorId)');

        res.status(201).json({ message: `Study room ${name} created successfully`, studyRoomId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update study room by ID
const updateStudyRoom = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM StudyRooms WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Study room not found' });
        }

        await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar, name || result.recordset[0].name)
            .query('UPDATE StudyRooms SET name = @name, type = @type WHERE id = @id');

        res.status(200).json({ message: `Study room ${id} updated successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete study room by ID
const deleteStudyRoom = async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.id;

    try {
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM StudyRooms WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Study room not found' });
        }

        if (result.recordset[0].creatorId !== userId) {
            return res.status(403).json({ message: 'Only the creator can delete this study room' });
        }

        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM StudyRooms WHERE id = @id');

        res.status(200).json({ message: `Study room ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all study rooms for a specific user
const getUserStudyRooms = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.id;

    try {
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .query('SELECT sr.* FROM StudyRooms sr JOIN Users_StudyRooms usr ON sr.id = usr.studyRoomId WHERE usr.userId = @userId');
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getStudyRooms,
    getStudyRoomById,
    createStudyRoom,
    updateStudyRoom,
    deleteStudyRoom,
    getUserStudyRooms
};
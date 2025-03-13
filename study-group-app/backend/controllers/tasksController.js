const sql = require('mssql');
const pool = require('../db');
const jwt = require('jsonwebtoken');

// Get all tasks for a specific user
const getUserTasks = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.id;

    try {
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .query('SELECT * FROM Tasks WHERE userId = @userId');
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get task by ID
const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Tasks WHERE id = @id');
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new task
const createTask = async (req, res) => {
    const { name, status = 'incomplete' } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.id;

    if (!name) {
        return res.status(400).json({ message: 'A name is  required to create a task' });
    }

    try {
        const result = await pool.request()
            .input('name', sql.VarChar, name)
            .input('status', sql.VarChar, status)
            .input('userId', sql.Int, userId)
            .query('INSERT INTO Tasks (name, status, userId) OUTPUT INSERTED.id VALUES (@name, @status, @userId)');

        const taskId = result.recordset[0].id;
        res.status(201).json({ message: `Task ${name} created successfully`, taskId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update task name by ID
const updateTaskName = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Tasks WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar, name)
            .query('UPDATE Tasks SET name = @name WHERE id = @id');

        res.status(200).json({ message: `Task ${id} updated successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update task status by ID
const updateTaskStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Tasks WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await pool.request()
            .input('id', sql.Int, id)
            .input('status', sql.VarChar, status)
            .query('UPDATE Tasks SET status = @status WHERE id = @id');

        res.status(200).json({ message: `Task ${id} updated successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete task by ID
const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Tasks WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Tasks WHERE id = @id');

        res.status(200).json({ message: `Task ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getUserTasks,
    getTaskById,
    createTask,
    updateTaskName,
    updateTaskStatus,
    deleteTask
};
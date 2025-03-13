const sql = require('mssql');
const pool = require('../db');

// Get all users
const getUsers = async (req, res) => {
    try {
        const result = await pool.request().query('SELECT username, name, email FROM Users');
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get user by username
const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT username, name, email FROM Users WHERE username = @username');
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update user by username
const updateUser = async (req, res) => {
    const { username } = req.params;
    const { password, name, email } = req.body;

    try {
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE username = @username');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = password ? await bcrypt.hash(password, 10) : result.recordset[0].password;

        await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, hashedPassword)
            .input('name', sql.VarChar, name || result.recordset[0].name)
            .input('email', sql.VarChar, email || result.recordset[0].email)
            .query('UPDATE Users SET password = @password, name = @name, email = @email WHERE username = @username');

        res.status(200).json({ message: `User ${username} updated successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete user by username
const deleteUser = async (req, res) => {
    const { username } = req.params;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE username = @username');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        await pool.request()
            .input('username', sql.VarChar, username)
            .query('DELETE FROM Users WHERE username = @username');

        res.status(200).json({ message: `User ${username} deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getUsers,
    getUserByUsername,
    updateUser,
    deleteUser
};
const sql = require('mssql');
const bcrypt = require('bcrypt');
const pool = require('../db'); // Import the database connection pool

const handleNewUser = async (req, res) => {
    const { username, password, name, email } = req.body;
    if (!username || !password || !name || !email) {
        return res.status(400).json({ message: 'All the fields are required.' });
    }

    try {
        // Check if user already exists
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE username = @username');

        if (result.recordset.length > 0) {
            return res.status(409).json({ message: 'Username already exists.' }); // Conflict http response
        }

        // Encrypt password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Add new user to the database
        await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, hashedPassword)
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .query('INSERT INTO Users (username, password, name, email) VALUES (@username, @password, @name, @email)');
        res.status(201).json({ message: `User  ${username} registered successfully.` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { handleNewUser };
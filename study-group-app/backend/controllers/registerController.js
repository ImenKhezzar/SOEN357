const sql = require('mssql');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const pool = require('../db'); // Import the database connection pool

const handleNewUser = async (req, res) => {
    const { username, password, name, email, age } = req.body;
    if (!username || !password || !name || !email || !age) {
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

        // Generate a random integer for the user ID
        const userId = crypto.randomInt(1, 1000000);

        // Add new user to the database
        await pool.request()
            .input('id', sql.Int, userId)
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, hashedPassword)
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .input('age', sql.VarChar, age)
            .query('INSERT INTO Users (id, username, password, name, email, age) VALUES (@id, @username, @password, @name, @email, @age)');
        res.status(201).json({ message: `User ${username} registered successfully.` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { handleNewUser };
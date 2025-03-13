const sql = require('mssql');
const bcrypt = require('bcrypt');
const pool = require('../db'); // Import the database connection pool

const handleLogin = async( req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Check if user exists
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE username = @username');

        if (result.recordset.length == 0) {
            return res.status(401).json({ message: 'Username not found.' }); // Unauthorized
        }

        // Evaluate passowrd (order is important here: non-hashed, hashed password)
        const match = await bcrypt.compare(password, result.recordset[0].password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid password.' }); // Unauthorized
        }
        else {
            // Add JWT tokens
            return res.status(200).json({ message: 'Login successful.' });
        }


    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { handleLogin };
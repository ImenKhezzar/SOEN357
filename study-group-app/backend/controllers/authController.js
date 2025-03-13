const sql = require('mssql');
const bcrypt = require('bcrypt');
const pool = require('../db'); // Import the database connection pool

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
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

        // Evaluate password (order is important here: non-hashed, hashed password)
        const match = await bcrypt.compare(password, result.recordset[0].password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid password.' }); // Unauthorized
        } else {
            // Add JWT tokens
            const accessToken = jwt.sign(
                { "username": result.recordset[0].username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' } // TODO: might need to increase later to 5m
            );

            const refreshToken = jwt.sign(
                { "username": result.recordset[0].username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            // Save refresh token in the database
            await pool.request()
                .input('username', sql.VarChar, username)
                .input('refreshToken', sql.VarChar, refreshToken)
                .query('UPDATE Users SET refreshToken = @refreshToken WHERE username = @username');

            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'None', secure: true}); // 1 day, http cookie aren't available to js, making it more secure
            res.status(200).json({ accessToken }); // Send the access token to the client with a 30s lifetime
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { handleLogin };
const sql = require('mssql');
const pool = require('../db'); // Import the database connection pool

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(401);
    }

    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    try {
        // Check if user exists
        const result =  await pool.request()
            .input('refreshToken', sql.VarChar, refreshToken)
            .query('SELECT username FROM Users WHERE refreshToken = @refreshToken');

            console.log(result);
        if (result.recordset === undefined) {
            return res.sendStatus(403); // Forbidden
        }

        // Evaluate jwt
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            // if the refeshToken is not the same or if it is not associated to the right user
            if (err || decoded.username !== result.recordset[0].username) {
                return res.sendStatus(403); // Forbidden
            }
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' } // TODO: might need to increase later to 5m
            );

            res.status(200).json({ accessToken }); // Send the access token to the client with a 30s lifetime
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { handleRefreshToken };
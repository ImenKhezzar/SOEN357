const sql = require('mssql');
const pool = require('../db'); // Import the database connection pool


const handleLogout = async (req, res) => {
    // On client, also delete access token

    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.sendStatus(204); // No content
    }

    const refreshToken = cookies.jwt;

    try {
        const result =  await pool.request()
            .input('refreshToken', sql.VarChar, refreshToken)
            .query('SELECT username FROM Users WHERE refreshToken = @refreshToken');

        if (result.recordset === undefined) {
            res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
            return res.sendStatus(204); // No content
        }

       // Delete refreshToken in db 
        await pool.request()
            .input('refreshToken', sql.VarChar, refreshToken)
            .query('UPDATE Users SET refreshToken = NULL WHERE refreshToken = @refreshToken');

        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
        res.sendStatus(204); // No content

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { handleLogout };
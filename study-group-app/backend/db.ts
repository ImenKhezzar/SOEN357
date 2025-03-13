import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();


const dbConfig = {
  server: "sql.bsite.net\\MSSQL2016",
  database: "crystalz03_lumora",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 1433,
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

// Connect to MSSQL Database
const pool = new sql.ConnectionPool(dbConfig);

pool.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

export default pool;
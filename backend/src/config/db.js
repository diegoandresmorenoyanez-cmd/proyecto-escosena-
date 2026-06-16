const mysql = require('mysql2/promise'); // <-- Importante que sea la versión /promise
const dotenv = require('dotenv');

dotenv.config();

// Creamos un pool de conexiones utilizando las variables de entorno
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cgmti', // pon el nombre real de tu base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log('🔌 Pool de conexiones de MySQL preparado.');

module.exports = pool;
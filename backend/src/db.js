const mysql = require('mysql2');
const dotenv = require('dotenv');

// Configurar dotenv para leer las variables del archivo .env
dotenv.config();

// Crear un "Pool" (estanque) de conexiones. Es más eficiente que una conexión única.
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'db_centro_mercados',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convertir el pool para que soporte Promesas (async/await), lo que hace el código más limpio
const db = pool.promise();

// Probar la conexión inmediatamente al iniciar el servidor
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error al conectar a la base de datos de MySQL:', err.message);
    } else {
        console.log('✅ ¡Conexión exitosa a la base de datos MySQL (db_centro_mercados)!');
        connection.release(); // Liberar la conexión
    }
});

module.exports = db;
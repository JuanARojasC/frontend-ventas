const { Pool } = require('pg');
require('dotenv').config();

// Render nos dará la variable DATABASE_URL con la conexión de Neon. 
// Si no existe, usamos tus variables locales del archivo .env
const connectionString = process.env.DATABASE_URL || 
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const pool = new Pool({
  connectionString,
  // Las bases de datos en la nube exigen SSL. Si estamos usando DATABASE_URL, lo activamos.
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

pool.connect((err) => {
  if (err) {
    console.error('Error de conexion a PostgreSQL:', err.stack);
  } else {
    console.log('Conectado a PostgreSQL correctamente');
  }
});

module.exports = pool;
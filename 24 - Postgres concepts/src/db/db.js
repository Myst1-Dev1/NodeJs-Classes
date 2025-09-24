const { Pool } = require('pg');

require('dotenv').config();

//create a new pool instance to manage database connections
// -> postgres -> :// -> [user] => [password] -> @ -> [host] : [port] -> [database]

const pool = new Pool({
    connectionString: process.env.DB_URL,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
});

async function query(text, params) {
    const start = Date.now();

    try {
        const result = await pool.query(text, params);

        //execute the time -> 
        const duration = Date.now() - start;

        console.log('executed query', { text, duration, rows: result.rowCount });

        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { query }
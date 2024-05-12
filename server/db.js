require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: process.env.postgresPassword,
  host: 'localhost',
  port: 5432, // default Postgres ports
  database: 'messaging_db',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

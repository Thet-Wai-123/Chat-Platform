require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: process.env.postgresPassword,
  host: process.env.postgresHost,
  port: 5432, // default Postgres ports
  database: 'messaging_platform_db',
  ssl: {
    rejectUnauthorized: false, // This fixes encryption error 
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

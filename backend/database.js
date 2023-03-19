require('dotenv').config();

// create connection
const knex = require('knex')({
    client: 'pg',
    connection: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
});

/* {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
} */

// Check that the connection works
knex.raw('SELECT VERSION()').then(() => {
    console.log(`connection to db successful!`);
});

module.exports = knex;

const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "sport_registration",
    password: "112233",
    port: 5432,
});

pool.connect()
    .then(() => console.log("PostgreSQL connected"))
    .catch(err => console.error("Connection error", err));

module.exports = pool;

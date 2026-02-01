const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
  },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
});

// Log when DB connects
pool.on("connect", () => {
  console.log("Connected to Neon database");
});

// Prevent app crash if connection drops
pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error:", err);
});

module.exports = pool;

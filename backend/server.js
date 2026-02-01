const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

/* =========================
   CORS — TEMPORARY OPEN (DEBUG)
   ========================= */
app.use(cors()); // 👈 allow ALL origins
app.use(express.json());

/* =========================
   TEST ROUTE
   ========================= */
app.get("/", (req, res) => {
  res.send("Backend is working");
});

/* =========================
   REGISTER ROUTE
   ========================= */
app.post("/register", async (req, res) => {
  try {
    const { name, registrationId, phone, section, year } = req.body;

    await pool.query(
      `INSERT INTO registrations 
       (name, registration_id, phone, section, year)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, registrationId, phone, section, year]
    );

    res.json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   START SERVER
   ========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

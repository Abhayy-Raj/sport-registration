const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

/* =========================
   CORS CONFIG (FIXED)
   ========================= */
app.use(
  cors({
    origin: "https://sport-registration.netlify.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

/* =========================
   MIDDLEWARE
   ========================= */
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

    if (!name || !registrationId || !phone || !section || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await pool.query(
      `INSERT INTO registrations
       (name, registration_id, phone, section, year)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, registrationId, phone, section, year]
    );

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error);
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

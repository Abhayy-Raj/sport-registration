const express = require("express");
const pool = require("./db");

const app = express();

/* =========================
   MANUAL CORS (PRODUCTION-SAFE)
   ========================= */
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://sport-registration.netlify.app"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* =========================
   MIDDLEWARE
   ========================= */
app.use(express.json());

/* =========================
   HEALTH CHECK ROUTE
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

    // Basic validation
    if (!name || !registrationId || !phone || !section || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }

await pool.query(
  `INSERT INTO users
   (name, reg_id, phone, section, "year")
   VALUES ($1, $2, $3, $4, $5)`,
  [name, registrationId, phone, section, year]
);



    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("DATABASE ERROR:", error);
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

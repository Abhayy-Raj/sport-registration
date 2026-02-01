const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// 🔴 VERY IMPORTANT — order matters
app.use(cors());
app.use(express.json());

// ✅ TEST ROUTE (this fixes Cannot GET /)
app.get("/", (req, res) => {
    res.send("Backend is working");
});

// ✅ REGISTER ROUTE
app.post("/register", async (req, res) => {
    console.log("REQ BODY:", req.body); // DEBUG LOG

    const { name, regId, phone, section, year } = req.body;

    try {
        await pool.query(
            `INSERT INTO users (name, reg_id, phone, section, year)
             VALUES ($1, $2, $3, $4, $5)`,
            [name, regId, phone, section, year]
        );

        res.json({ message: "Registration successful" });
    } catch (err) {
        console.error("DB ERROR:", err.message);
        res.status(500).json({ message: "Database error" });
    }
});

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


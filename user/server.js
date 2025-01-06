const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
      [username, hashedPassword]
    );
    res.status(201).json({ userId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// Fetch user details
app.get("/users/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.params.id,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

app.listen(port, () => console.log(`User Service running on port ${port}`));

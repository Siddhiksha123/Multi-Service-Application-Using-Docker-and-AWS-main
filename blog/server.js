const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5002;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

// Create a blog
app.post("/blogs", async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO blogs (title, content) VALUES ($1, $2) RETURNING id",
      [title, content]
    );
    res.status(201).json({ blogId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: "Error creating blog" });
  }
});

// List blogs
app.get("/blogs", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM blogs");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
});

app.listen(port, () => console.log(`Blog Service running on port ${port}`));

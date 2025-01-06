const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5003;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

// Add a comment
app.post("/comments", async (req, res) => {
  const { postId, comment } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO comments (post_id, comment) VALUES ($1, $2) RETURNING id",
      [postId, comment]
    );
    res.status(201).json({ commentId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: "Error adding comment" });
  }
});

// Get comments by post ID
app.get("/comments", async (req, res) => {
  const { post_id } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM comments WHERE post_id = $1",
      [post_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching comments" });
  }
});

app.listen(port, () => console.log(`Comment Service running on port ${port}`));

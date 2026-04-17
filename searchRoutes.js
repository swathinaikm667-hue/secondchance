const express = require("express");
const router = express.Router();
const connectToDatabase = require("./db.js");

let db;
connectToDatabase()
  .then((database) => {
    db = database;
  })
  .catch((err) => {
    console.error("Failed to connect DB in searchRoutes:", err);
  });

// GET /api/secondchance/search?category=electronics
router.get("/api/secondchance/search", async (req, res) => {
  try {
    const collection = db.collection("inserted_items");
    const { category } = req.query;
    const filter = {};
    if (category) {
      filter.category = category;                
    }
    const items = await collection.find(filter).toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
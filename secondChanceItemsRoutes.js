const express = require("express");
const multer = require("multer");
const connectToDatabase = require("./db.js");

const router = express.Router();

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Keep DB connection ready
let db;
connectToDatabase()
  .then((database) => {
    db = database;
  })
  .catch((err) => {
    console.error("Failed to connect DB in routes:", err);
  });

// POST /api/secondchance/items (with file upload)
router.post("/api/secondchance/items", upload.single("image"), async (req, res) => {
  try {
    const collection = db.collection("inserted_items");
    const newItem = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      location: req.body.location,
      createdAt: new Date(),
    };
    const result = await collection.insertOne(newItem);
    res.status(201).json({ ...newItem, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Failed to save item" });
  }
});

// GET /api/secondchance/items
router.get("/api/secondchance/items", async (req, res) => {
  try {
    const collection = db.collection("inserted_items");
    const items = await collection.find({}).toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// GET /api/secondchance/items/:id
router.get("/api/secondchance/items/:id", async (req, res) => {
  try {
    const collection = db.collection("inserted_items");
    const item = await collection.findOne({ _id: req.params.id });
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch item" });
  }
});

// DELETE /api/secondchance/items/:id
router.delete("/api/secondchance/items/:id", async (req, res) => {
  try {
    const collection = db.collection("inserted_items");
    const result = await collection.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

module.exports = router;
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Memory DB (simplified for Task 9)
let users = [];

// POST /api/secondchance/auth/register
router.post("/api/secondchance/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, username, email, password: hashedPassword };
    users.push(user);
    res.status(201).json({ id: user.id, username, email });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST /api/secondchance/auth/login
router.post("/api/secondchance/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, email: user.email }, "secretkey", { expiresIn: "1h" });

    res.json({ id: user.id, username: user.username, token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// PUT /api/secondchance/auth/user (update user info)
router.put("/api/secondchance/auth/user", (req, res) => {
  try {
    const { id, username, email, bio } = req.body;
    const user = users.find((u) => u.id === id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (username) user.username = username;
    if (email) user.email = email;
    if (bio) user.bio = bio;

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

module.exports = router;s
const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// GET all coffee drinks
router.get("/", async (req, res) => {
  try {
    const drinks = await MenuItem.find({ category: "coffee" });
    res.json(drinks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new drink (Admin only)
router.post("/", protect, upload.single('image'), async (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  // Get image path if uploaded, otherwise use default or provided URL string
  // Note: frontend might send a URL string if no file is selected but that's less likely with file input
  // We will prioritize the uploaded file.
  let imageUrl = req.body.imageUrl;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  } else if (!imageUrl) {
    imageUrl = '/images/espresso.jpg'; // fallback
  }

  try {
    const newDrink = await MenuItem.create({
      name,
      price,
      imageUrl,
      category: "coffee"
    });
    res.status(201).json({ message: "Drink added", drink: newDrink });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a drink (Admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const drink = await MenuItem.findById(req.params.id);

    if (!drink) {
      return res.status(404).json({ error: "Drink not found" });
    }

    await drink.deleteOne();
    res.json({ message: "Drink deleted", drink });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// GET all restaurant food
router.get("/", async (req, res) => {
  try {
    const foods = await MenuItem.find({ category: "restaurant" });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new food (Admin only)
router.post("/", protect, upload.single('image'), async (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  let imageUrl = req.body.imageUrl;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  } else if (!imageUrl) {
    imageUrl = '/images/pizza.jpg'; // fallback
  }

  try {
    const newFood = await MenuItem.create({
      name,
      price,
      imageUrl,
      description,
      category: "restaurant"
    });
    res.status(201).json({ message: "Food added", food: newFood });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE food (Admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const food = await MenuItem.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    await food.deleteOne();
    res.json({ message: "Food deleted", food });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update food (Admin only)
router.put("/:id", protect, upload.single('image'), async (req, res) => {
  try {
    const { name, price } = req.body;
    const food = await MenuItem.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    food.name = name || food.name;
    food.price = price !== undefined ? price : food.price;

    if (req.file) {
      food.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedFood = await food.save();
    res.json({ message: "Food updated", food: updatedFood });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

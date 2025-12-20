const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const { protect } = require("../middleware/authMiddleware");

// POST new message (Public)
router.post("/message", async (req, res) => {
    const { email, message } = req.body;
    if (!email || !message) {
        return res.status(400).json({ success: false, msg: "Email and message are required" });
    }

    try {
        const newMessage = await Message.create({
            email,
            message
        });

        res.status(201).json({
            success: true,
            msg: "Message received successfully",
            data: newMessage
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET all messages (Admin only)
router.get("/message", protect, async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;

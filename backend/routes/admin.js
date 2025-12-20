const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/dashboard", protect, (req, res) => {
    res.json({
        success: true,
        msg: `Welcome ${req.user.username}`,
        user: req.user
    });
});

module.exports = router;

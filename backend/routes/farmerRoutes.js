const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
    const { name, phone, village } = req.body;

    res.json({
        message: "Farmer registered successfully",
        farmer: {
            name,
            phone,
            village
        }
    });
});

module.exports = router;
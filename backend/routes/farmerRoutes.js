const express = require("express");
const Farmer = require("../models/farmerModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, phone, village } = req.body;

    if (!name || !phone || !village) {
      return res.status(400).json({
        message: "Name, phone and village are required.",
      });
    }

    const farmer = new Farmer({
      name,
      phone,
      village,
    });

    await farmer.save();

    res.status(201).json({
      message: "Farmer registered successfully",
      farmer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to register farmer",
      error: error.message,
    });
  }
});

module.exports = router;
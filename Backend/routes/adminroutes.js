const express = require("express");
const mongoose = require("mongoose");
const Admin = require("../db/Admin");

const router = express.Router();

// Admin Registration (for adding admin manually to the collection)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists." });
    }

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

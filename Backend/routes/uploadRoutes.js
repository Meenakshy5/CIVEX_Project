const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const router = express.Router();

// Ensure directories exist
const resumeDir = path.join(__dirname, "../public/resume");
const profileDir = path.join(__dirname, "../public/profile");

if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir, { recursive: true });
}
if (!fs.existsSync(profileDir)) {
  fs.mkdirSync(profileDir, { recursive: true });
}

// Configure multer
const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/resume", upload.single("file"), (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).json({ message: "No file provided" });
  }

  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (fileExtension !== ".pdf") {
    return res.status(400).json({ message: "Invalid format. Only .pdf allowed" });
  }

  const filename = `${uuidv4()}${fileExtension}`;
  const filePath = path.join(resumeDir, filename);

  fs.writeFile(filePath, file.buffer, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error while uploading" });
    }

    res.status(200).json({
      message: "File uploaded successfully",
      url: `/host/resume/${filename}`,
    });
  });
});

router.post("/profile", upload.single("file"), (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).json({ message: "No file provided" });
  }

  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (fileExtension !== ".jpg" && fileExtension !== ".png") {
    return res.status(400).json({ message: "Invalid format. Only .jpg and .png allowed" });
  }

  const filename = `${uuidv4()}${fileExtension}`;
  const filePath = path.join(profileDir, filename);

  fs.writeFile(filePath, file.buffer, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error while uploading" });
    }

    res.status(200).json({
      message: "Profile image uploaded successfully",
      url: `/host/profile/${filename}`,
    });
  });
});

module.exports = router;

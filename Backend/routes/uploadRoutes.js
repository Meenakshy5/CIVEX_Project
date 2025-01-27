const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const cloudinary = require("cloudinary").v2;  // Import Cloudinary SDK
const dotenv = require("dotenv");  // Import dotenv for environment variables


// Load environment variables from .env file
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,  // Use your Cloudinary cloud name
  api_key: process.env.CLOUD_API_KEY,  // Your Cloudinary API key
  api_secret: process.env.CLOUD_API_SECRET,  // Your Cloudinary API secret
});

const router = express.Router();

// Ensure directories exist for local storage (optional, since you're uploading to Cloudinary)
const resumeDir = path.join(__dirname, "../public/resume");
const profileDir = path.join(__dirname, "../public/profile");

if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir, { recursive: true });
}
if (!fs.existsSync(profileDir)) {
  fs.mkdirSync(profileDir, { recursive: true });
}

// Configure multer to store files temporarily
const upload = multer({
  storage: multer.memoryStorage(),  // Store files in memory
});

// Route for uploading resume
router.post("/resume", upload.single("file"), (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).json({ message: "No file provided" });
  }

  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (fileExtension !== ".pdf") {
    return res.status(400).json({ message: "Invalid format. Only .pdf allowed" });
  }

  // Upload to Cloudinary
  cloudinary.uploader.upload_stream(
    { resource_type: "auto", public_id: uuidv4(), folder: "civex/resume" },  // Folder is optional
    (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Error while uploading to Cloudinary" });
      }
      res.status(200).json({
        message: "File uploaded successfully",
        url: result.secure_url,  // Cloudinary URL for the uploaded file
      });
    }
  ).end(file.buffer);  // Upload the file buffer to Cloudinary
});

// Route for uploading profile image
router.post("/profile", upload.single("file"), (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).json({ message: "No file provided" });
  }

  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (fileExtension !== ".jpg" && fileExtension !== ".png") {
    return res.status(400).json({ message: "Invalid format. Only .jpg and .png allowed" });
  }

  // Upload to Cloudinary
  cloudinary.uploader.upload_stream(
    { resource_type: "image", public_id: uuidv4(), folder: "civex/profile" },  // Folder is optional
    (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Error while uploading to Cloudinary" });
      }
      res.status(200).json({
        message: "Profile image uploaded successfully",
        url: result.secure_url,  // Cloudinary URL for the uploaded image
      });
    }
  ).end(file.buffer);  // Upload the file buffer to Cloudinary
});

// Signup route (handling form data and file uploads)
router.post("/signup", upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "profile", maxCount: 1 },
]), async (req, res) => {
  try {
    // Upload resume to Cloudinary
    const resumeResult = await cloudinary.uploader.upload(req.files["resume"][0].buffer, {
      resource_type: "raw",  // For non-image files like PDFs
      folder: "civex/resume",
    });

    // Upload profile image to Cloudinary
    const profileResult = await cloudinary.uploader.upload(req.files["profile"][0].buffer, {
      folder: "civex/profile_images",
    });

    // Create the user object with form data and file URLs
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      skills: req.body.skills.split(","),  // Example: split skills into an array
      resume: resumeResult.secure_url,
      profile: profileResult.secure_url,
      contactNumber: req.body.contactNumber,
      type: req.body.type,
      bio: req.body.bio || "",
      education: req.body.education,
    };

    // Save user data to the database (e.g., MongoDB)
    const User = require("./models/User");  // Replace with your actual User model
    const newUser = new User(userData);
    await newUser.save();

    // Respond with success message
    res.status(200).json({ message: "Signup successful!", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during signup", error: err.message });
  }
});

module.exports = router;

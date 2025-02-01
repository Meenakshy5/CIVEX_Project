const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const User = require('../db/User'); // Import your User model

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "dnsn0h9rn",
  api_key: process.env.CLOUD_API_KEY || 694692123754412,
  api_secret: process.env.CLOUD_API_SECRET || "l4Y5D3LXq-Y5Mof8nUucU8uBT14",
});

const upload = multer({ storage: multer.memoryStorage() });

// Upload Resume
router.post('/resume', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) throw new Error('No file uploaded');
    if (!req.file.mimetype.includes('pdf')) throw new Error('Invalid file type');

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'raw', folder: 'resumes' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    // Save the resume URL to the database
    const userId = req.user_id; // Assuming you have user info in the request (e.g., from authentication middleware)
    await User.findByIdAndUpdate(userId, { resume: result.secure_url });

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error('Resume upload error:', err);
    res.status(400).json({ message: err.message });
  }
});

// Upload Profile Photo
router.post('/profile', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) throw new Error('No file uploaded');
    if (!req.file.mimetype.includes('image/')) throw new Error('Invalid file type');

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'profiles' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    // Save the profile photo URL to the database
    const userId = req.user_id; // Assuming you have user info in the request
    await User.findByIdAndUpdate(userId, { profile: result.secure_url });

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error('Profile upload error:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
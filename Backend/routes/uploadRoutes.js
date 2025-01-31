const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME ||"dnsn0h9rn",
  api_key: process.env.CLOUD_API_KEY || 694692123754412,
  api_secret: process.env.CLOUD_API_SECRET|| "l4Y5D3LXq-Y5Mof8nUucU8uBT14",
});

const upload = multer({ storage: multer.memoryStorage() });

router.post('/resume', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) throw new Error('No file uploaded');
    if (!req.file.mimetype.includes('pdf')) throw new Error('Invalid file type');

    console.log('File received:', req.file); // Log the file details

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

    console.log('Upload result:', result); // Log the Cloudinary result
    res.json({ url: result.secure_url });
  } catch (err) {
    console.error('Resume upload error:', err); // Log the error
    res.status(400).json({ message: err.message });
  }
});

// router.post('/resume', upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) throw new Error('No file uploaded');
//     if (!req.file.mimetype.includes('pdf')) throw new Error('Invalid file type');

//     const result = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { resource_type: 'raw', folder: 'resumes' },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       );
//       stream.end(req.file.buffer);
//     });

//     res.json({ url: result.secure_url });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

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

    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
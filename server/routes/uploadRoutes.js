import express from 'express';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// @desc    Upload single image to Cloudinary
// @route   POST /api/upload
// @access  Public / Admin
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    // Cloudinary returns file.path as the secure https URL
    // Local fallback returns relative path
    const fileUrl = req.file.path.startsWith('http')
      ? req.file.path
      : `/uploads/${req.file.filename}`;

    res.json({
      message: 'Image uploaded successfully',
      url: fileUrl,
      public_id: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Upload multiple images to Cloudinary
// @route   POST /api/upload/multiple
// @access  Public / Admin
router.post('/multiple', upload.array('images', 6), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No image files uploaded' });
    }

    const urls = req.files.map((file) =>
      file.path.startsWith('http') ? file.path : `/uploads/${file.filename}`
    );

    res.json({
      message: 'Images uploaded successfully',
      urls: urls,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

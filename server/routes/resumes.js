import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import Resume from '../models/Resume.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// GET all resumes
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new resume submission with Cloudinary upload
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const { candidateName, email, phone, category, experience } = req.body;
    let fileUrl = '';
    let fileName = req.file ? req.file.originalname : 'Candidate_Resume.pdf';

    if (req.file) {
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'interskill/resume_bank',
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      const uploadResult = await uploadPromise;
      fileUrl = uploadResult.secure_url;
    }

    const count = await Resume.countDocuments();
    const resumeId = `RES-${601 + count}`;
    const formattedDate = new Date().toLocaleString();

    const newResume = new Resume({
      resumeId,
      candidateName,
      email,
      phone,
      category: category || 'General Candidate Pool',
      experience: experience || 'Profile Submitted',
      fileName,
      fileUrl,
      formattedDate,
    });

    const saved = await newResume.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Resume submission error:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE resume
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Resume.findOneAndDelete({
      $or: [{ _id: req.params.id }, { resumeId: req.params.id }],
    });
    if (!deleted) return res.status(404).json({ message: 'Resume not found' });
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

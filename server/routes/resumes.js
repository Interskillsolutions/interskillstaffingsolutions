import express from 'express';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import cloudinary from '../config/cloudinary.js';
import Resume from '../models/Resume.js';
import { protect } from '../middleware/auth.js';
import { saveUploadedFile } from '../utils/fileStorage.js';

const router = express.Router();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  if (allowedTypes.includes(file.mimetype) || file.originalname.match(/\.(pdf|doc|docx)$/i)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Only PDF, DOC, and DOCX files are allowed.'), false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter,
});

const resumeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many resumes uploaded. Please try again later.' },
});

// GET all resumes (Protected)
router.get('/', protect, async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new resume submission with Cloudinary upload (Public)
router.post('/', resumeLimiter, upload.single('resume'), async (req, res) => {
  try {
    const { candidateName, email, phone, category, experience } = req.body;
    if (!candidateName || !email || !phone) {
      return res.status(400).json({ message: 'Candidate name, email, and phone number are required' });
    }

    let fileUrl = '';
    let fileName = req.file ? req.file.originalname : 'Candidate_Resume.pdf';

    // If file provided, save to VPS disk (or Cloudinary if configured)
    if (req.file) {
      const stored = await saveUploadedFile(req.file, 'resumes', req);
      fileUrl = stored.url;
      fileName = stored.fileName;
    }

    const count = await Resume.countDocuments();
    const resumeId = `RES-${601 + count}`;
    const formattedDate = new Date().toLocaleString();

    const newResume = new Resume({
      resumeId,
      candidateName: candidateName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      category: category || 'General Candidate Pool',
      experience: experience || 'Profile Submitted',
      fileName,
      fileUrl,
      status: 'New',
      formattedDate,
    });

    const saved = await newResume.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Resume submission error:', error);
    res.status(400).json({ message: error.message });
  }
});

// PATCH update resume details (status, notes) (Protected)
router.patch('/:id', protect, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (typeof notes === 'string') updateData.notes = notes;

    const query = req.params.id.length === 24
      ? { $or: [{ _id: req.params.id }, { resumeId: req.params.id }] }
      : { resumeId: req.params.id };

    const updated = await Resume.findOneAndUpdate(
      query,
      updateData,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Resume record not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE resume (Protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const query = req.params.id.length === 24
      ? { $or: [{ _id: req.params.id }, { resumeId: req.params.id }] }
      : { resumeId: req.params.id };

    const deleted = await Resume.findOneAndDelete(query);
    if (!deleted) return res.status(404).json({ message: 'Resume not found' });
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import Applicant from '../models/Applicant.js';
import Job from '../models/Job.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// GET all applicants
router.get('/', async (req, res) => {
  try {
    const applicants = await Applicant.find().sort({ createdAt: -1 });
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new applicant (with optional file upload)
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const { jobId, jobTitle, candidateName, email, phone, experience, currentCompany } = req.body;
    let resumeUrl = '';
    let resumeFileName = req.file ? req.file.originalname : 'Candidate_Resume.pdf';

    // If file provided, upload to Cloudinary
    if (req.file) {
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'interskill/resumes',
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
      resumeUrl = uploadResult.secure_url;
    }

    const count = await Applicant.countDocuments();
    const applicantId = `APP-${501 + count}`;
    const formattedDate = new Date().toLocaleString();

    const newApplicant = new Applicant({
      applicantId,
      jobId: jobId || 'general',
      jobTitle: jobTitle || 'General Opening',
      candidateName,
      email,
      phone,
      experience: experience || '1-3 Years',
      currentCompany: currentCompany || 'Applicant',
      resumeUrl,
      resumeFileName,
      status: 'New',
      formattedDate,
    });

    const saved = await newApplicant.save();

    // Increment applicantsCount on the Job if valid jobId
    if (jobId) {
      await Job.findOneAndUpdate(
        { $or: [{ _id: jobId }, { jobId }] },
        { $inc: { applicantsCount: 1 } }
      ).catch(() => {});
    }

    res.status(201).json(saved);
  } catch (error) {
    console.error('Applicant submission error:', error);
    res.status(400).json({ message: error.message });
  }
});

// PATCH status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Applicant.findOneAndUpdate(
      { $or: [{ _id: req.params.id }, { applicantId: req.params.id }] },
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Applicant not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE applicant
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Applicant.findOneAndDelete({
      $or: [{ _id: req.params.id }, { applicantId: req.params.id }],
    });
    if (!deleted) return res.status(404).json({ message: 'Applicant not found' });
    res.json({ message: 'Applicant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

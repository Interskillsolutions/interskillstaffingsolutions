import express from 'express';
import Job from '../models/Job.js';

const router = express.Router();

// GET all jobs (public can see active, admin can see all)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new job
router.post('/', async (req, res) => {
  try {
    const {
      title,
      company,
      experience,
      location,
      type,
      category,
      tags,
      description,
      isNew,
      status,
    } = req.body;

    const count = await Job.countDocuments();
    const jobId = `job-${Date.now()}`;

    const newJob = new Job({
      jobId,
      title,
      company,
      experience: experience || '1 – 3 Years',
      location: location || 'Mumbai, Maharashtra',
      type: type || 'Full-Time',
      category: category || 'IT & Technology',
      tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t) => t.trim()),
      description: description || '',
      isNew: isNew !== undefined ? isNew : true,
      status: status || 'Active',
      applicantsCount: 0,
    });

    const saved = await newJob.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update job
router.put('/:id', async (req, res) => {
  try {
    const updated = await Job.findOneAndUpdate(
      { $or: [{ _id: req.params.id }, { jobId: req.params.id }] },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Job not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE job
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Job.findOneAndDelete({
      $or: [{ _id: req.params.id }, { jobId: req.params.id }],
    });
    if (!deleted) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

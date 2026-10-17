import express from 'express';
import Consultation from '../models/Consultation.js';

const router = express.Router();

// GET all consultations
router.get('/', async (req, res) => {
  try {
    const list = await Consultation.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new consultation
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, requirementType, preferredRole } = req.body;
    const count = await Consultation.countDocuments();
    const consultationId = `CON-${301 + count}`;
    const formattedDate = new Date().toLocaleString();

    const newConsultation = new Consultation({
      consultationId,
      name,
      phone,
      email,
      requirementType: requirementType || "I'm looking for a job",
      preferredRole: preferredRole || 'General consultation',
      status: 'New',
      formattedDate,
    });

    const saved = await newConsultation.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Consultation.findOneAndUpdate(
      { $or: [{ _id: req.params.id }, { consultationId: req.params.id }] },
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Consultation not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE consultation
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Consultation.findOneAndDelete({
      $or: [{ _id: req.params.id }, { consultationId: req.params.id }],
    });
    if (!deleted) return res.status(404).json({ message: 'Consultation not found' });
    res.json({ message: 'Consultation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

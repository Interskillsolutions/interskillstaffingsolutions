import express from 'express';
import EmployerLead from '../models/EmployerLead.js';

const router = express.Router();

// GET all leads
router.get('/', async (req, res) => {
  try {
    const leads = await EmployerLead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new lead
router.post('/', async (req, res) => {
  try {
    const { name, company, phone, email, category, openings, description } = req.body;
    const count = await EmployerLead.countDocuments();
    const leadId = `LEAD-${101 + count}`;
    const formattedDate = new Date().toLocaleString();

    const newLead = new EmployerLead({
      leadId,
      name,
      company,
      phone,
      email,
      category: category || 'General Requirement',
      openings: openings || '1-2',
      description: description || '',
      status: 'New',
      formattedDate,
    });

    const saved = await newLead.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await EmployerLead.findOneAndUpdate(
      { $or: [{ _id: req.params.id }, { leadId: req.params.id }] },
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Lead not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE lead
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await EmployerLead.findOneAndDelete({
      $or: [{ _id: req.params.id }, { leadId: req.params.id }],
    });
    if (!deleted) return res.status(404).json({ message: 'Lead not found' });
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

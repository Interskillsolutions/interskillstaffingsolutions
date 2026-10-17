import express from 'express';
import Callback from '../models/Callback.js';

const router = express.Router();

// GET all callbacks
router.get('/', async (req, res) => {
  try {
    const callbacks = await Callback.find().sort({ createdAt: -1 });
    res.json(callbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new callback
router.post('/', async (req, res) => {
  try {
    const { name, mobile, topic, source } = req.body;
    const count = await Callback.countDocuments();
    const callbackId = `CB-${201 + count}`;
    const formattedDate = new Date().toLocaleString();

    const newCallback = new Callback({
      callbackId,
      name,
      mobile,
      topic: topic || 'General enquiry',
      source: source || 'Website Callback Banner',
      status: 'Pending',
      formattedDate,
    });

    const saved = await newCallback.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Callback.findOneAndUpdate(
      { $or: [{ _id: req.params.id }, { callbackId: req.params.id }] },
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Callback not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE callback
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Callback.findOneAndDelete({
      $or: [{ _id: req.params.id }, { callbackId: req.params.id }],
    });
    if (!deleted) return res.status(404).json({ message: 'Callback not found' });
    res.json({ message: 'Callback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

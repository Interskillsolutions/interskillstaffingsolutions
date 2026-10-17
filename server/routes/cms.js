import express from 'express';
import TeamMember from '../models/TeamMember.js';
import SiteStats from '../models/SiteStats.js';

const router = express.Router();

// GET team members
router.get('/team', async (req, res) => {
  try {
    const team = await TeamMember.find().sort({ order: 1, createdAt: 1 });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST or batch update team members
router.post('/team', async (req, res) => {
  try {
    const { team } = req.body;
    if (Array.isArray(team)) {
      await TeamMember.deleteMany({});
      const formatted = team.map((m, idx) => ({
        memberId: m.id || m.memberId || `team-${idx}`,
        name: m.name,
        role: m.role,
        quote: m.quote || '',
        image: m.image || '/images/team-priya.jpg',
        order: idx,
      }));
      const saved = await TeamMember.insertMany(formatted);
      return res.json(saved);
    }

    const { name, role, quote, image } = req.body;
    const member = new TeamMember({
      memberId: `team-${Date.now()}`,
      name,
      role,
      quote: quote || '',
      image: image || '/images/team-priya.jpg',
    });
    const saved = await member.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET site stats
router.get('/stats', async (req, res) => {
  try {
    let stats = await SiteStats.findOne({ key: 'global_stats' });
    if (!stats) {
      stats = await SiteStats.create({ key: 'global_stats' });
    }
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update site stats
router.put('/stats', async (req, res) => {
  try {
    const updated = await SiteStats.findOneAndUpdate(
      { key: 'global_stats' },
      req.body,
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;

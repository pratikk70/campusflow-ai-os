const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

// GET /api/schedule — query all Schedule documents sorted by date descending
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ date: -1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a schedule entry
router.delete('/:id', async (req, res) => {
  try {
    const Schedule = require('../models/Schedule');
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete entry' });
  }
});

module.exports = router;

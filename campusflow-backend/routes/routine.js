const express = require('express');
const router = express.Router();
const mockData = require('../data/mockData');

// GET /api/routine — returns routine, attendance, mess, and shuttles data
router.get('/', (req, res) => {
  res.json(mockData);
});

module.exports = router;

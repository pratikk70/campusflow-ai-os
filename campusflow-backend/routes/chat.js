const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Schedule = require('../models/Schedule');
const { getModel } = require('../services/gemini');
const mockData = require('../data/mockData');

// POST /api/chat — Gemini conversation with campus context
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    // Validate request body has non-empty message
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    // Fetch recent schedules from DB for context
    const recentSchedules = await Schedule.find().sort({ date: -1 }).limit(10);

    // Build context string with mockData and recent schedules
    const scheduleContext = recentSchedules.length > 0
      ? recentSchedules.map(s => `[${s.category}] ${s.title}: ${s.summary} (${s.date.toLocaleDateString()})`).join('\n')
      : 'No upcoming schedule entries.';

    const routineContext = mockData.routine
      .map(r => `${r.subject} | ${r.time} | ${r.location}`)
      .join('\n');

    const attendanceContext = mockData.attendance
      .map(a => `${a.subject}: ${a.percentage}%`)
      .join('\n');

    const messContext = Object.entries(mockData.mess)
      .map(([meal, items]) => `${meal}: ${items.join(', ')}`)
      .join('\n');

    const contextString = `
--- Student Routine ---
${routineContext}

--- Attendance ---
${attendanceContext}

--- Mess Menu ---
${messContext}

--- Recent Schedule/Events ---
${scheduleContext}
`.trim();

    // Call Gemini with system context + user message
    const model = getModel();
    const prompt = `You are CampusFlow AI, a helpful campus assistant for a final-year IT student at NIT Raipur. You have access to the following campus data:\n\n${contextString}\n\nUser question: ${message}\n\nProvide a helpful, concise response based on the available campus data. If the question is outside your knowledge, say so politely.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Save user message and assistant response as Message documents
    await Message.create({ role: 'user', content: message });
    await Message.create({ role: 'assistant', content: responseText });

    // Return response
    return res.status(200).json({ response: responseText });
  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({ error: 'Failed to generate AI response' });
  }
});

module.exports = router;

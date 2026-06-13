const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const { getModel } = require('../services/gemini');

// POST /api/summarize — Extract structured data from raw text using Gemini
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;

    // Validate that text field exists and is non-empty
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "Text content is required" });
    }

    // Get the Gemini model
    const model = getModel();

    // Call Gemini with a prompt instructing extraction of category, title, summary
    const prompt = `You are a campus event extraction assistant. Analyze the following text and extract structured information from it.

Return a JSON object with exactly these fields:
- "category": one of "PLACEMENT", "ASSIGNMENT", "CLUB", "UPDATE" (choose the most appropriate category)
- "title": a clean, concise title for the event or announcement
- "summary": a one-sentence summary of the key information

Text to analyze:
${text}`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json'
      }
    });

    const response = result.response;
    const responseText = response.text();

    // Parse the JSON response from Gemini
    const extracted = JSON.parse(responseText);

    // Create and save a new Schedule document
    const schedule = new Schedule({
      category: extracted.category,
      title: extracted.title,
      summary: extracted.summary,
      date: new Date()
    });

    const savedSchedule = await schedule.save();

    // Return saved document as JSON
    return res.status(200).json(savedSchedule);
  } catch (error) {
    console.error('Summarize error:', error);
    return res.status(500).json({ error: "Failed to process text with AI" });
  }
});

module.exports = router;

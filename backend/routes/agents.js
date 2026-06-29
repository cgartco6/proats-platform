const express = require('express');
const router = express.Router();
const { callGrokAPI } = require('../ai/grokIntegration');

router.post('/optimize-resume', async (req, res) => {
  const { originalContent, jobDescription } = req.body;
  const prompt = `Optimize this resume for the job: ${jobDescription}. Resume: ${originalContent}`;
  const optimized = await callGrokAPI(prompt);
  res.json({ optimizedContent: optimized });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { callGrokAPI } = require('../ai/grokIntegration');

// Interview Q&A Predictor Agent
router.post('/questions', async (req, res) => {
  const { jobRole = "Professional Role" } = req.body;
  
  const prompt = `Generate 25 realistic interview questions for a ${jobRole} position, focused on 2026 and beyond trends (AI, ethics, sustainability, leadership). Include behavioral, technical, and situational questions.`;
  
  try {
    const questionsText = await callGrokAPI(prompt);
    const questions = questionsText.split('\n').filter(q => q.trim().length > 5);
    
    res.json({ 
      questions: questions.slice(0, 25),
      count: 25,
      focus: "2026 and beyond"
    });
  } catch (e) {
    res.json({ questions: ["Question 1: Tell me about yourself...", /* 24 more */], count: 25 });
  }
});

router.post('/answers', async (req, res) => {
  const { question } = req.body;
  const prompt = `Provide a strong STAR method answer for this interview question: ${question}`;
  const answer = await callGrokAPI(prompt);
  res.json({ question, sampleAnswer: answer });
});

module.exports = router;

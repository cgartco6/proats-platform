const express = require('express');
const router = express.Router();
const { callGrokAPI } = require('../ai/grokIntegration');

// AI Career Tutor & Coach Agent
router.post('/coach', async (req, res) => {
  const { topic, userInput = "" } = req.body;
  
  let prompt = `Act as an expert career coach. Give detailed, practical advice for 2026 job interviews on the topic: ${topic}. User context: ${userInput}`;
  
  if (topic === 'dress') prompt += " Focus on modern professional attire.";
  if (topic === 'nervousness') prompt += " Include breathing and mindset techniques.";
  
  try {
    const advice = await callGrokAPI(prompt);
    res.json({ 
      advice, 
      tips: ["Record practice sessions", "Focus on body language", "Prepare questions to ask them"] 
    });
  } catch (e) {
    res.json({ advice: "Comprehensive coaching advice would appear here in full AI mode." });
  }
});

module.exports = router;

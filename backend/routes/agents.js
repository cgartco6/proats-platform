const express = require('express');
const router = express.Router();
const { callGrokAPI } = require('../ai/grokIntegration');

// Resume Builder & ATS Optimizer Agent
router.post('/optimize-resume', async (req, res) => {
  const { originalContent, jobDescription } = req.body;
  
  try {
    const prompt = `Act as an expert career coach. Optimize this resume for the following job description. Make it highly ATS-friendly, use strong action verbs, quantify achievements where possible, and align with 2026+ industry trends. 
    Job: ${jobDescription}
    Resume: ${originalContent}`;
    
    const optimized = await callGrokAPI(prompt);
    
    res.json({ 
      optimizedContent: optimized,
      improvements: [
        "Tailored keywords for ATS",
        "Stronger action verbs",
        "Better quantifiable achievements",
        "Improved readability and structure",
        "2026-forward alignment"
      ]
    });
  } catch (error) {
    res.status(500).json({ error: 'AI optimization failed' });
  }
});

module.exports = router;

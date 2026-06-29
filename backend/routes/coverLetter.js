const express = require('express');
const router = express.Router();
const { callGrokAPI } = require('../ai/grokIntegration');

// Cover Letter Architect Agent
router.post('/generate', async (req, res) => {
  const { resumeContent, jobDescription, companyTone = 'professional' } = req.body;
  
  try {
    const prompt = `Write a compelling, highly tailored cover letter. Match the company's tone (${companyTone}). Connect the candidate's experience directly to the job requirements. Keep it concise, powerful, and professional.
    Job Description: ${jobDescription}
    Candidate Resume Summary: ${resumeContent}`;
    
    const coverLetter = await callGrokAPI(prompt);
    
    res.json({ 
      coverLetter,
      success: true,
      tips: ["Customize further with specific company research", "Keep under 1 page"]
    });
  } catch (error) {
    res.status(500).json({ error: 'Cover letter generation failed' });
  }
});

module.exports = router;

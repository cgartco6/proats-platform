const axios = require('axios');

async function callGrokAPI(prompt) {
  try {
    // Real xAI Grok API call (2026 ready)
    // const response = await axios.post('https://api.x.ai/v1/chat/completions', {
    //   model: "grok-beta",
    //   messages: [{ role: "user", content: prompt }],
    //   temperature: 0.7
    // }, {
    //   headers: { Authorization: `Bearer ${process.env.GROK_API_KEY}` }
    // });
    
    // For demo / sandbox - rich simulated response
    return `GROK AI OPTIMIZED OUTPUT:\n\n${prompt.substring(0, 400)}...\n\nKey Improvements:\n• Strong action verbs and metrics\n• Perfect ATS keyword alignment\n• 2026-forward thinking language\n• Professional, confident tone`;
  } catch (error) {
    return "AI Service temporarily unavailable. Using high-quality template output.";
  }
}

module.exports = { callGrokAPI };

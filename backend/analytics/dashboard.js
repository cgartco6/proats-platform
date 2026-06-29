const express = require('express');
const router = express.Router();

// Owner Analytics
router.get('/stats', (req, res) => {
  res.json({
    totalUsers: 87,
    totalResumesProcessed: 342,
    totalCoverLetters: 156,
    revenueZAR: 28940,
    activeSessions: 12,
    topCountries: ["South Africa", "USA", "UK"],
    averageATSScore: 78
  });
});

module.exports = router;

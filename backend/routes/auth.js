const express = require('express');
const router = express.Router();

const OWNER_PASSPHRASE = process.env.OWNER_PASSPHRASE || "YOUR_SECURE_PASSPHRASE_HERE_CHANGE_THIS";

// Owner Secure Login
router.post('/owner-login', (req, res) => {
  const { passphrase } = req.body;
  
  if (passphrase === OWNER_PASSPHRASE) {
    res.json({ 
      success: true, 
      role: 'owner', 
      message: 'Unlimited free access granted. Welcome back, Owner.' 
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid passphrase. Access denied.' 
    });
  }
});

// Client Access Check
router.post('/check-access', (req, res) => {
  const { userId, paymentStatus } = req.body;
  const hasAccess = paymentStatus === 'paid' || userId === 'owner';
  res.json({ hasAccess, message: hasAccess ? 'Access granted' : 'Payment required' });
});

module.exports = router;

const express = require('express');
const router = express.Router();

// South Africa Payments
router.post('/payfast', (req, res) => {
  res.json({
    success: true,
    redirectUrl: 'https://www.payfast.co.za/eng/process',
    message: 'PayFast ZAR payment initiated. Use reference: ATS-' + Date.now()
  });
});

router.post('/eft-fnb', (req, res) => {
  res.json({
    accountNumber: 'YOUR_FNB_ACCOUNT_NUMBER',
    branchCode: 'YOUR_BRANCH_CODE',
    reference: 'ATS-USER-' + Date.now(),
    amountZAR: req.body.amount || 299,
    message: 'Direct EFT to FNB. Send proof to owner for activation.'
  });
});

// Global Payments
router.post('/stripe', (req, res) => {
  res.json({ 
    sessionUrl: 'https://checkout.stripe.com/...' 
  });
});

router.post('/paypal', (req, res) => {
  res.json({ 
    approvalUrl: 'https://www.paypal.com/...' 
  });
});

module.exports = router;

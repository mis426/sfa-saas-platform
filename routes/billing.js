const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');
const Billing = require('../models/Billing');
const AuditLog = require('../models/AuditLog');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/billing/upgrade-seats
// @desc    Upgrade tenant seat capacity & generate invoice record
// @access  Private (Client Admin / SuperAdmin)
router.post('/upgrade-seats', authMiddleware, async (req, res) => {
  try {
    const { additionalSeats, planType } = req.body;
    const seatsToAdd = parseInt(additionalSeats, 10);

    if (!seatsToAdd || seatsToAdd <= 0) {
      return res.status(400).json({ error: 'Please enter a valid number of seats to add.' });
    }

    const tenant = await Tenant.findById(req.user.clientId);
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant record not found.' });
    }

    // Pricing calculation (e.g., $10 per seat)
    const costPerSeat = 10;
    const totalAmount = seatsToAdd * costPerSeat;
    const fakeTxnId = `TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 1. Update Tenant Max Allowed Seats
    tenant.maxAllowedUsers += seatsToAdd;
    await tenant.save();

    // 2. Create Billing Record
    const billingRecord = await Billing.create({
      clientId: tenant._id,
      planType: planType || 'Pro',
      additionalSeatsRequested: seatsToAdd,
      amountPaid: totalAmount,
      paymentStatus: 'completed',
      transactionId: fakeTxnId
    });

    // 3. Create Security Audit Log
    await AuditLog.create({
      clientId: tenant._id,
      actionBy: req.user.id || req.user._id,
      action: 'SEAT_LIMIT_UPDATED',
      details: `Upgraded subscription by +${seatsToAdd} seats. Total seats now: ${tenant.maxAllowedUsers}. Txn: ${fakeTxnId}`
    });

    res.status(200).json({
      message: `Successfully added ${seatsToAdd} seats to your plan!`,
      newMaxAllowedUsers: tenant.maxAllowedUsers,
      billing: billingRecord
    });
  } catch (err) {
    console.error('Upgrade Seats Error:', err);
    res.status(500).json({ error: 'Failed to process seat upgrade.' });
  }
});

// @route   GET /api/billing/history
// @desc    Fetch invoice & subscription billing history for client
// @access  Private
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const history = await Billing.find({ clientId: req.user.clientId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error('Fetch Billing History Error:', err);
    res.status(500).json({ error: 'Failed to fetch billing history.' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/analytics/summary
// @desc    Get platform-wide analytics summary for SuperAdmin
// @access  Private (SuperAdmin)
router.get('/summary', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Access denied. SuperAdmin privileges required.' });
    }

    const totalTenants = await Tenant.countDocuments();
    const activeTenants = await Tenant.countDocuments({ status: 'active' });
    const totalUsers = await User.countDocuments({ role: { $ne: 'superadmin' } });
    
    const tenants = await Tenant.find();
    const totalAllocatedSeats = tenants.reduce((acc, t) => acc + (t.maxAllowedUsers || 0), 0);
    const utilizationRate = totalAllocatedSeats > 0 ? Math.round((totalUsers / totalAllocatedSeats) * 100) : 0;

    res.json({
      totalTenants,
      activeTenants,
      totalUsers,
      totalAllocatedSeats,
      utilizationRate
    });
  } catch (err) {
    console.error('Analytics Summary Error:', err);
    res.status(500).json({ error: 'Failed to generate analytics data.' });
  }
});

module.exports = router;
const Tenant = require('../models/Tenant');

module.exports = async function (req, res, next) {
  try {
    if (req.user && req.user.role !== 'superadmin' && req.user.clientId) {
      const tenant = await Tenant.findById(req.user.clientId);
      if (!tenant) {
        return res.status(404).json({ error: 'Tenant record not found.' });
      }

      if (tenant.status === 'suspended') {
        return res.status(403).json({
          error: 'Your organization account has been suspended. Please contact platform support.'
        });
      }
    }
    next();
  } catch (err) {
    console.error('Check Tenant Status Error:', err);
    res.status(500).json({ error: 'Server error during tenant status verification.' });
  }
};
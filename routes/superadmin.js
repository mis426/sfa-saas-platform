const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/superadmin/tenants
// @desc    Get all registered tenant clients with current seat usage
// @access  Private (SuperAdmin)
router.get('/tenants', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Access denied. SuperAdmin privileges required.' });
    }

    const tenants = await Tenant.find().sort({ createdAt: -1 });
    
    const tenantsWithUsage = await Promise.all(
      tenants.map(async (tenant) => {
        const activeUsersCount = await User.countDocuments({ clientId: tenant._id });
        return {
          ...tenant.toObject(),
          activeUsersCount
        };
      })
    );

    res.json(tenantsWithUsage);
  } catch (err) {
    console.error('Fetch Tenants Error:', err);
    res.status(500).json({ error: 'Failed to fetch tenant client list.' });
  }
});

// @route   POST /api/superadmin/tenants
// @desc    Onboard new tenant client & create initial Client Admin account
// @access  Private (SuperAdmin)
router.post('/tenants', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Access denied. SuperAdmin privileges required.' });
    }

    const { companyName, maxAllowedUsers, clientAdminName, clientAdminEmail, clientAdminPassword } = req.body;

    if (!companyName || !clientAdminEmail) {
      return res.status(400).json({ error: 'Company Name and Admin Email are required.' });
    }

    const existingUser = await User.findOne({ email: clientAdminEmail });
    if (existingUser) {
      return res.status(400).json({ error: 'A user with this email address already exists.' });
    }

    // 1. Create Tenant Document
    const newTenant = new Tenant({
      companyName,
      maxAllowedUsers: parseInt(maxAllowedUsers) || 5,
      status: 'active'
    });
    const savedTenant = await newTenant.save();

    // 2. Create Initial Client Admin
    const newAdmin = new User({
      name: clientAdminName || 'Client Admin',
      email: clientAdminEmail,
      password: clientAdminPassword || 'ClientAdmin123',
      role: 'admin',
      clientId: savedTenant._id
    });
    await newAdmin.save();

    // 3. Create Audit Log
    await AuditLog.create({
      clientId: savedTenant._id,
      actionBy: req.user.id || req.user._id,
      action: 'TENANT_ONBOARDED',
      details: `New tenant ${savedTenant.companyName} onboarded with max ${savedTenant.maxAllowedUsers} seats.`
    });

    res.status(201).json({
      message: 'Tenant onboarded successfully.',
      tenant: savedTenant,
      admin: { id: newAdmin._id, email: newAdmin.email }
    });
  } catch (err) {
    console.error('Onboard Tenant Error:', err);
    res.status(500).json({ error: err.message || 'Failed to onboard new tenant.' });
  }
});

// @route   PATCH /api/superadmin/tenants/:id/status
// @desc    Toggle tenant account status (active / suspended)
// @access  Private (SuperAdmin)
router.patch('/tenants/:id/status', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Access denied. SuperAdmin privileges required.' });
    }

    const { status } = req.body;
    if (!['active', 'suspended'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Choose active or suspended.' });
    }

    const updatedTenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedTenant) {
      return res.status(404).json({ error: 'Tenant record not found.' });
    }

    // Record Audit Log Entry
    await AuditLog.create({
      clientId: updatedTenant._id,
      actionBy: req.user.id || req.user._id,
      action: status === 'suspended' ? 'TENANT_SUSPENDED' : 'TENANT_ACTIVATED',
      details: `Tenant ${updatedTenant.companyName} status changed to ${status.toUpperCase()}.`
    });

    res.json({
      message: `Tenant status updated to ${status}.`,
      tenant: updatedTenant
    });
  } catch (err) {
    console.error('Update Status Error:', err);
    res.status(500).json({ error: 'Failed to update tenant status.' });
  }
});

// @route   GET /api/superadmin/audit-logs
// @desc    Fetch global platform activity logs
// @access  Private (SuperAdmin)
router.get('/audit-logs', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Access denied. SuperAdmin privileges required.' });
    }

    const logs = await AuditLog.find()
      .populate('clientId', 'companyName')
      .populate('actionBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(logs);
  } catch (err) {
    console.error('Fetch Audit Logs Error:', err);
    res.status(500).json({ error: 'Failed to fetch audit logs.' });
  }
});

module.exports = router;
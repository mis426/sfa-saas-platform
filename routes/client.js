const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Tenant = require('../models/Tenant');
const AuditLog = require('../models/AuditLog');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/auth/login
// @desc    User & SuperAdmin Login Endpoint with Tenant Suspension & Audit Check
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter both email and password.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Check bcrypt hashed or fallback plain password
    let isMatch = false;
    if (user.password && (user.password.startsWith('$2a$') || user.password.startsWith('$2b$'))) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = (password === user.password);
    }

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Check if non-superadmin user belongs to a suspended tenant
    if (user.role !== 'superadmin' && user.clientId) {
      const tenant = await Tenant.findById(user.clientId);
      if (tenant && tenant.status === 'suspended') {
        // Record security audit log for blocked login attempt
        await AuditLog.create({
          clientId: tenant._id,
          actionBy: user._id,
          action: 'USER_LOGIN_BLOCKED',
          details: `Login attempt blocked for suspended tenant account (${user.email}).`
        });

        return res.status(403).json({
          error: 'Your organization account has been suspended. Please contact platform support.'
        });
      }
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_key';
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, clientId: user.clientId },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        clientId: user.clientId
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ error: 'Server authentication failed.' });
  }
});

// @route   GET /api/client/team
// @desc    Get Client Team & Seat Usage
// @access  Private
router.get('/team', authMiddleware, async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.user.clientId);
    const users = await User.find({ clientId: req.user.clientId }).select('-password');
    
    res.json({
      tenantName: tenant ? tenant.companyName : 'N/A',
      maxAllowedUsers: tenant ? tenant.maxAllowedUsers : 0,
      activeUsersCount: users.length,
      users
    });
  } catch (err) {
    console.error('Fetch Team Error:', err);
    res.status(500).json({ error: 'Failed to fetch team details.' });
  }
});

// @route   POST /api/client/team
// @desc    Add Team Member with Seat Enforcement & Audit Logging
// @access  Private
router.post('/team', authMiddleware, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const tenant = await Tenant.findById(req.user.clientId);
    if (!tenant) return res.status(404).json({ error: 'Tenant record not found.' });

    const currentCount = await User.countDocuments({ clientId: req.user.clientId });

    if (currentCount >= tenant.maxAllowedUsers) {
      return res.status(400).json({ 
        error: `Seat limit reached (${currentCount}/${tenant.maxAllowedUsers}). Upgrade plan to add users.` 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already registered.' });

    const newUser = new User({
      name,
      email,
      password,
      role: role || 'user',
      clientId: req.user.clientId
    });

    await newUser.save();

    // Audit Log Creation
    await AuditLog.create({
      clientId: req.user.clientId,
      actionBy: req.user.id || req.user._id,
      action: 'USER_ADDED',
      details: `New team member ${newUser.email} (${newUser.role}) added.`
    });

    res.status(201).json({ message: 'Team member added successfully', user: newUser });
  } catch (err) {
    console.error('Add Team Member Error:', err);
    res.status(500).json({ error: err.message || 'Failed to add team member.' });
  }
});

module.exports = router;
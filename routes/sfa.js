const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Visit = require('../models/Visit');
const AuditLog = require('../models/AuditLog');
const authMiddleware = require('../middleware/auth');

// ==========================================
// 1. SALES LEADS & FIELD REP TRACKING
// ==========================================

// GET /api/sfa/leads - Fetch client leads
router.get('/leads', authMiddleware, async (req, res) => {
  try {
    const leads = await Lead.find({ clientId: req.user.clientId }).populate('assignedTo', 'name email');
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sales leads.' });
  }
});

// POST /api/sfa/leads - Create new lead
router.post('/leads', authMiddleware, async (req, res) => {
  try {
    const { clientName, contactPerson, email, phone, status, value, notes } = req.body;
    
    const lead = await Lead.create({
      clientId: req.user.clientId,
      assignedTo: req.user.id || req.user._id,
      clientName,
      contactPerson,
      email,
      phone,
      status: status || 'New',
      value: value || 0,
      notes
    });

    await AuditLog.create({
      clientId: req.user.clientId,
      actionBy: req.user.id || req.user._id,
      action: 'LEAD_CREATED',
      details: `New sales lead created: ${clientName} ($${value})`
    });

    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create sales lead.' });
  }
});

// ==========================================
// 2. PRODUCT INVENTORY CATALOG MANAGEMENT
// ==========================================

// GET /api/sfa/products - Fetch inventory catalog
router.get('/products', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ clientId: req.user.clientId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products inventory.' });
  }
});

// POST /api/sfa/products - Create or update SKU item
router.post('/products', authMiddleware, async (req, res) => {
  try {
    const { name, sku, price, stock } = req.body;
    const product = await Product.create({
      clientId: req.user.clientId,
      name,
      sku,
      price: parseFloat(price) || 0,
      stock: parseInt(stock, 10) || 0
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product to catalog.' });
  }
});

// ==========================================
// 3. ORDER MANAGEMENT SYSTEM (OMS)
// ==========================================

// GET /api/sfa/orders - Fetch client orders
router.get('/orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ clientId: req.user.clientId }).populate('createdBy', 'name email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sales orders.' });
  }
});

// POST /api/sfa/orders - Create sales order & deduct product stock
router.post('/orders', authMiddleware, async (req, res) => {
  try {
    const { customerName, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one product item.' });
    }

    const totalAmount = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);

    const order = await Order.create({
      clientId: req.user.clientId,
      createdBy: req.user.id || req.user._id,
      customerName,
      items,
      totalAmount
    });

    // Auto-deduct stock from inventory if matching product exists
    for (const item of items) {
      if (item.productId) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity }
        });
      }
    }

    await AuditLog.create({
      clientId: req.user.clientId,
      actionBy: req.user.id || req.user._id,
      action: 'ORDER_PLACED',
      details: `New sales order #${order._id.toString().slice(-6)} created for ${customerName} ($${totalAmount})`
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create sales order.' });
  }
});

// ==========================================
// 4. GPS FIELD CHECK-IN & VISITS TRACKING
// ==========================================

// POST /api/sfa/checkin - Record field rep GPS check-in
router.post('/checkin', authMiddleware, async (req, res) => {
  try {
    const { clientName, lat, lng, notes } = req.body;
    const visit = await Visit.create({
      clientId: req.user.clientId,
      repId: req.user.id || req.user._id,
      clientName,
      location: { lat, lng },
      notes: notes || 'GPS Check-In logged from field'
    });

    res.status(201).json(visit);
  } catch (err) {
    res.status(500).json({ error: 'Failed to log field GPS check-in.' });
  }
});

// GET /api/sfa/visits - Fetch field visits
router.get('/visits', authMiddleware, async (req, res) => {
  try {
    const visits = await Visit.find({ clientId: req.user.clientId }).populate('repId', 'name email');
    res.json(visits);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch visit records.' });
  }
});

// ==========================================
// 5. ANALYTICS & PERFORMANCE DASHBOARD METRICS
// ==========================================

// GET /api/sfa/analytics - Summary Stats
router.get('/analytics', authMiddleware, async (req, res) => {
  try {
    const clientId = req.user.clientId;

    const totalLeads = await Lead.countDocuments({ clientId });
    const wonLeads = await Lead.countDocuments({ clientId, status: 'Closed-Won' });

    const orders = await Order.find({ clientId });
    const totalOrdersCount = orders.length;
    const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);

    const visitsCount = await Visit.countDocuments({ clientId });

    res.json({
      totalLeads,
      wonLeads,
      conversionRate: totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0,
      totalOrdersCount,
      totalRevenue,
      visitsCount
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load analytics metrics.' });
  }
});

module.exports = router;
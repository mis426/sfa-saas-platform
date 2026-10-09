const Product = require('../models/Product');
const Lead = require('../models/Lead');
const Order = require('../models/Order');

// 1. Get Analytics Summary (Scoped to Tenant)
exports.getAnalytics = async (req, res) => {
  try {
    const clientId = req.user?.clientId || req.body.clientId;

    if (!clientId) {
      return res.status(400).json({ error: 'Client ID is required for multi-tenant analytics.' });
    }

    const totalLeads = await Lead.countDocuments({ clientId });
    const totalOrdersCount = await Order.countDocuments({ clientId });

    const revenueAggregation = await Order.aggregate([
      { $match: { clientId } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);

    const totalRevenue = revenueAggregation[0]?.totalRevenue || 0;

    res.status(200).json({
      totalLeads,
      totalOrdersCount,
      totalRevenue
    });
  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({ error: 'Failed to fetch SFA analytics' });
  }
};

// 2. Add New SKU Product
exports.createProduct = async (req, res) => {
  try {
    const clientId = req.user?.clientId || req.body.clientId;

    if (!clientId) {
      return res.status(400).json({ error: 'clientId field is required' });
    }

    const { name, sku, price, stock, category, description } = req.body;

    const newProduct = new Product({
      clientId,
      name,
      sku,
      price,
      stock,
      category,
      description
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Create Product Error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Product with this SKU already exists.' });
    }
    res.status(500).json({ error: error.message || 'Failed to add product to catalog.' });
  }
};

// 3. Create Lead
exports.createLead = async (req, res) => {
  try {
    const clientId = req.user?.clientId || req.body.clientId;
    
    const lead = new Lead({
      ...req.body,
      clientId
    });

    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    console.error('Create Lead Error:', error);
    res.status(500).json({ error: 'Failed to create lead.' });
  }
};

// 4. Place Order
exports.createOrder = async (req, res) => {
  try {
    const clientId = req.user?.clientId || req.body.clientId;
    
    const order = new Order({
      ...req.body,
      clientId
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Create Order Error:', error);
    res.status(500).json({ error: 'Failed to place order.' });
  }
};
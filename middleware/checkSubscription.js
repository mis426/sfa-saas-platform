const Client = require('../models/Client');

const checkSubscription = async (req, res, next) => {
  try {
    const clientId = req.body.clientId || req.params.clientId || req.user?.clientId;
    if (!clientId) return next();

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ error: 'Client nahi mila.' });

    if (new Date() > new Date(client.subscriptionExpiry)) {
      return res.status(403).json({ 
        error: 'Subscription Expired! Apne Super Admin se contact karke plan renew karein.' 
      });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = checkSubscription;
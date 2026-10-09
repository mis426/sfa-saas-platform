const User = require('../models/User');
const Client = require('../models/Client');

const checkSeatLimit = async (req, res, next) => {
  try {
    const { clientId } = req.body; // Client ki ID request body se aayegi

    if (!clientId) {
      return res.status(400).json({ error: 'Client ID required hai.' });
    }

    // 1. Client ka record aur status check karein
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client nahi mila.' });
    }

    if (client.status !== 'active') {
      return res.status(403).json({ error: 'Aapka account active nahi hai. Admin se sampark karein.' });
    }

    // 2. Database mein check karein abhi kitne ACTIVE users hain
    const currentActiveUsers = await User.countDocuments({ 
      clientId: clientId, 
      isActive: true 
    });

    // 3. Agar active users limit ke barabar ya zyadah hain, toh block kar dein
    if (currentActiveUsers >= client.maxAllowedUsers) {
      return res.status(403).json({
        error: 'Seat limit full ho chuki hai!',
        message: `Aapki current plan limit ${client.maxAllowedUsers} users ki hai. Naye user add karne ke liye plan upgrade karein.`,
        currentActiveUsers,
        maxAllowedUsers: client.maxAllowedUsers
      });
    }

    // Limit bachi hai, next step (User Creation) per bhejein
    next();
  } catch (error) {
    res.status(500).json({ error: 'Seat limit check karne mein server error aaya.' });
  }
};

module.exports = checkSeatLimit;
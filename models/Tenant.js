const mongoose = require('mongoose');
const crypto = require('crypto');

const clientSchema = new mongoose.Schema({
  companyName: { 
    type: String, 
    required: [true, 'Company name zaroori hai'],
    trim: true 
  },
  maxAllowedUsers: { 
    type: Number, 
    default: 5 
  },
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'suspended'], 
    default: 'active' 
  },
  licenseKey: { 
    type: String, 
    default: () => `LIC-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${Date.now().toString().slice(-4)}`
  },
  subscriptionExpiry: { 
    type: Date, 
    default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000) 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Client', clientSchema);
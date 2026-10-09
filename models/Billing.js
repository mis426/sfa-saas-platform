const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  clientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Client', 
    required: true 
  },
  planType: { 
    type: String, 
    enum: ['Basic', 'Pro', 'Enterprise'], 
    default: 'Pro' 
  },
  additionalSeatsRequested: { 
    type: Number, 
    required: true 
  },
  amountPaid: { 
    type: Number, 
    required: true 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'completed' 
  },
  transactionId: { 
    type: String, 
    required: true 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Billing', billingSchema);
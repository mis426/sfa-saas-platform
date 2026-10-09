const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  clientName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Qualified', 'Proposal', 'Closed-Won', 'Closed-Lost'], 
    default: 'New' 
  },
  value: { type: Number, default: 0 },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  repId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clientName: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  notes: { type: String },
  checkInTime: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Visit', visitSchema);
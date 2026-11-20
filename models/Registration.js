const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Registration',
  new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: String,
      ticketType: { type: String, default: 'General' },
      status: { type: String, default: 'validated' },
    },
    { timestamps: true }
  )
);

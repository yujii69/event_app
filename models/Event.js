const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Event',
  new mongoose.Schema(
    {
      title: { type: String, required: true },
      description: String,
      date: Date,
      location: String,
      image: String,
      price: { type: Number, default: 0 },
      capacity: Number,
    },
    { timestamps: true }
  )
);

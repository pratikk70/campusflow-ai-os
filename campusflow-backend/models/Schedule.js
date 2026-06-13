const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['PLACEMENT', 'ASSIGNMENT', 'CLUB', 'UPDATE'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Schedule', scheduleSchema);

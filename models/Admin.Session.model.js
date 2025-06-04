const mongoose = require("mongoose");

const GitaSessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  whatsappNumber: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
    max: 150,
  },
  collegeOrWorking: {
    type: String,
    enum: ['college', 'working', 'other'],
  },
  place: {
    type: String,
    trim: true,
  },
  selectedBook: {
    type: String,
    required: false, // Optional
  },
  interestedInGitaSession: {
    type: Boolean,
    required: true,
  },
  folkOrCongregation: {
    type: String,
    enum: ['FOLK', 'Congregation', 'None'],
    required: false,
    default: 'None', // Optional: default value
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('GitaSessionParticipant', GitaSessionSchema);

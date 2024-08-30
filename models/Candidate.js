const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  civilstatus: {
    type: String,
    required: true,
  },
  citizenship: {
    type: String,
    required: true,
  },
  hasvoted: {
    type: Boolean,
    default: false,
  },
  platform: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('candidate', CandidateSchema);

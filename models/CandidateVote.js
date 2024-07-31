const mongoose = require('mongoose');

const CandidateVoteSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'candidate',
  },
  chairman: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'candidate',
  },
  councelors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'candidate',
    },
  ],
  skchairman: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'candidate',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('candidatevote', CandidateVoteSchema);

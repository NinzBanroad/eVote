const mongoose = require('mongoose');

const UserVoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
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

module.exports = mongoose.model('uservote', UserVoteSchema);

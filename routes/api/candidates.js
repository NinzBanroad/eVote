const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const { check, validationResult } = require('express-validator');

const Candidate = require('../../models/Candidate');
const CandidateVote = require('../../models/CandidateVote');

// @route    GET api/candidates/all-candidates
// @desc     Get all candidates
// @access   Private
router.get('/all-candidates', auth, async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/candidates/vote/:candidate_id
// @desc     Get votes by User ID
// @access   Private
router.get(
  '/vote/:candidate_id',
  auth,
  checkObjectId('candidate_id'),
  async (req, res) => {
    try {
      const data = {};
      const candidatevote = await CandidateVote.findOne({
        candidate: req.params.candidate_id,
      }).populate('candidate');
      if (!candidatevote) {
        return res.status(404).json({ msg: 'Vote not found' });
      }

      data.candidate = candidatevote.candidate;
      data.chairman = await Candidate.findOne({
        _id: candidatevote.chairman.toString(),
      });
      const newCouncelors = [];
      for (let i = 0; i < candidatevote.councelors.length; i++) {
        const councelors = await Candidate.findOne({
          _id: candidatevote.councelors[i].toString(),
        });
        newCouncelors.push(councelors);
      }
      data.councelors = newCouncelors;
      data.skchairman = await Candidate.findOne({
        _id: candidatevote.skchairman.toString(),
      });

      res.json(data);
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/candidates/add-vote
// @desc     Create a vote
// @access   Private
router.post('/add-vote', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { candidate, chairman, councelors, skchairman } = req.body;

  try {
    const newCandidateVote = new CandidateVote({
      candidate: candidate,
      chairman: chairman,
      councelors: councelors,
      skchairman: skchairman,
    });

    const candidatevote = await newCandidateVote.save();

    res.json(candidatevote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

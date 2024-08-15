const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const { check, validationResult } = require('express-validator');

const Candidate = require('../../models/Candidate');
const CandidateVote = require('../../models/CandidateVote');

// @route    GET api/candidates/current-candidate
// @desc     Get platform by Candidate ID
// @access   Private
router.get(
  '/current-candidate/:candidate_id',
  auth,
  checkObjectId('candidate_id'),
  async (req, res) => {
    try {
      const candidate = await Candidate.findById(req.params.candidate_id);
      res.json(candidate);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

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

      data.id = candidatevote._id;
      data.date = candidatevote.date;
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

    //after voting we'll update the hasvoted field to true
    await Candidate.findOneAndUpdate(
      { _id: candidate },
      { $set: { hasvoted: true } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(candidatevote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/candidates/get-platform
// @desc     Get platform by Candidate ID
// @access   Private
router.get(
  '/get-platform/:candidate_id',
  auth,
  checkObjectId('candidate_id'),
  async (req, res) => {
    try {
      const candidate = await Candidate.findById(req.params.candidate_id);
      res.json(candidate);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/candidates/add-platform
// @desc     Create/Update a platform
// @access   Private
router.post('/add-platform', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { candidate, platform } = req.body;

  try {
    const newPlatform = await Candidate.findOneAndUpdate(
      { _id: candidate },
      { $set: { platform: platform } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(newPlatform);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/candidates/delete-platform/:candidate_id
// @desc     Delete a platform
// @access   Private
router.post(
  '/delete-platform/:candidate_id',
  auth,
  checkObjectId('candidate_id'),
  async (req, res) => {
    try {
      const newPlatform = await Candidate.findOneAndUpdate(
        { _id: req.params.candidate_id },
        { $set: { platform: null } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      res.json(newPlatform);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

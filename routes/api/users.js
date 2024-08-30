const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const User = require('../../models/User');
const Candidate = require('../../models/Candidate');
const UserVote = require('../../models/UserVote');

// @route    GET api/users/all-users
// @desc     Get all users
// @access   Private
router.get('/all-users', auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/user/vote/:user_id
// @desc     Get votes by User ID
// @access   Private
router.get(
  '/vote/:user_id',
  auth,
  checkObjectId('user_id'),
  async (req, res) => {
    try {
      const data = {};
      const uservote = await UserVote.findOne({
        user: req.params.user_id,
      }).populate('user');
      if (!uservote) {
        return res.status(404).json({ msg: 'Vote not found' });
      }

      data.id = uservote._id;
      data.date = uservote.date;
      data.user = uservote.user;
      data.chairman = await Candidate.findOne({
        _id: uservote.chairman.toString(),
      });
      const newCouncelors = [];
      for (let i = 0; i < uservote.councelors.length; i++) {
        const councelors = await Candidate.findOne({
          _id: uservote.councelors[i].toString(),
        });
        newCouncelors.push(councelors);
      }
      data.councelors = newCouncelors;
      data.skchairman = await Candidate.findOne({
        _id: uservote.skchairman.toString(),
      });

      res.json(data);
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/users/add-vote
// @desc     Create a vote
// @access   Private
router.post('/add-vote', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { user, chairman, councelors, skchairman } = req.body;

  try {
    const newUserVote = new UserVote({
      user: user,
      chairman: chairman,
      councelors: councelors,
      skchairman: skchairman,
    });

    const uservote = await newUserVote.save();

    //after voting we'll update the hasvoted field to true
    await User.findOneAndUpdate(
      { _id: user },
      { $set: { hasvoted: true } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(uservote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

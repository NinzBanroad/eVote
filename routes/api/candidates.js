const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Candidate = require('../../models/Candidate');

// @route    POST api/candidate
// @desc     Register candidate
// @access   Public
router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let candidate = await Candidate.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Candidate already exists' }] });
      }

      candidate = new Candidate({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      candidate.password = await bcrypt.hash(password, salt);

      await candidate.save();

      const payload = {
        candidate: {
          id: candidate.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

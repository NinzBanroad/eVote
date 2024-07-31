const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Admin = require('../../models/Admin');
const Candidate = require('../../models/Candidate');

// @route    GET api/auth/get/user-role
// @desc     Get user/admin/candidate by token
// @access   Private
router.get('/get/user-role', auth, async (req, res) => {
  try {
    if (req.data.role === 'user') {
      const user = await User.findById(req.data.id).select('-password');
      res.json(user);
    } else if (req.data.role === 'admin') {
      const admin = await Admin.findById(req.data.id).select('-password');
      res.json(admin);
    } else {
      const candidate = await Candidate.findById(req.data.id).select(
        '-password'
      );
      res.json(candidate);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/get/user', auth, async (req, res) => {
  console.log('user', req.user.id);
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/auth
// @desc     Get Admin by token
// @access   Private
router.get('/get/admin', auth, async (req, res) => {
  console.log('admin', req.admin.id);
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/auth
// @desc     Get candidate by token
// @access   Private
router.get('/get/candidate', auth, async (req, res) => {
  console.log('candidate', req.candidate.id);
  try {
    const candidate = await Candidate.findById(req.candidate.id).select(
      '-password'
    );
    res.json(candidate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth/user-type
// @desc     Authenticate User & get User Type
// @access   Public
router.post(
  '/user-type',
  check('email', 'Please include a valid email').isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      let user = await User.findOne({ email });
      let admin = await Admin.findOne({ email });
      let candidate = await Candidate.findOne({ email });

      if (user) {
        res.json(user.role);
      } else if (admin) {
        res.json(admin.role);
      } else if (candidate) {
        res.json(candidate.role);
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/auth
// @desc     Authenticate User & get token
// @access   Public
router.post(
  '/user',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        data: {
          id: user.id,
          role: user.role,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ user, token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/auth
// @desc     Authenticate Admin & get token
// @access   Public
router.post(
  '/admin',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let admin = await Admin.findOne({ email });

      if (!admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        data: {
          id: admin.id,
          role: admin.role,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ admin, token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/auth
// @desc     Authenticate Candidate & get token
// @access   Public
router.post(
  '/candidate',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let candidate = await Candidate.findOne({ email });

      if (!candidate) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, candidate.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        data: {
          id: candidate.id,
          role: candidate.role,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ candidate, token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

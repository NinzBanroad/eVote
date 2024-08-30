const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');
const multer = require('multer');
const path = require('path');

const Admin = require('../../models/Admin');
const User = require('../../models/User');
const Candidate = require('../../models/Candidate');

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// @route    GET api/admins/all-users
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

// @route    GET api/admins/all-candidates
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

// @route    POST api/admins
// @desc     Register Admin
// @access   Public
router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('role', 'Role is required').notEmpty(),
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

    const { name, role, email, password } = req.body;

    try {
      let admin = await Admin.findOne({ email });

      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Admin already exists' }] });
      }

      admin = new Admin({
        name,
        role,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      admin.password = await bcrypt.hash(password, salt);

      await admin.save();

      const payload = {
        admin: {
          id: admin.id,
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

//@route  POST api/admins/add-user
//@desc   Create User/Voter
//@access Private
router.post(
  '/add-user',
  [auth, upload.single('image')],
  [
    check('role', 'Role is required').not().isEmpty(),
    check('firstname', 'Firstname is required').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('age', 'Age is required').not().isEmpty(),
    check('birthdate', 'Birthdate is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('civilstatus', 'Civil Status is required').not().isEmpty(),
    check('citizenship', 'Citizenship is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      role,
      firstname,
      lastname,
      email,
      password,
      age,
      birthdate,
      address,
      civilstatus,
      citizenship,
    } = req.body;

    const image = req.file ? req.file.filename : null;

    //Build user fields object
    const userFields = {};

    if (image) userFields.image = image;
    if (role) userFields.role = role;
    if (firstname) userFields.firstname = firstname;
    if (lastname) userFields.lastname = lastname;
    if (email) userFields.email = email;
    if (password) userFields.password = password;
    if (age) userFields.age = age;
    if (birthdate) userFields.birthdate = birthdate;
    if (address) userFields.address = address;
    if (civilstatus) userFields.civilstatus = civilstatus;
    if (citizenship) userFields.citizenship = citizenship;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      //Create User
      user = new User(userFields);

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //Return token
      const payload = {
        user: {
          id: user.id,
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
      res.status.send('Server Error');
    }
  }
);

//@route  POST api/admins/add-candidate
//@desc   Create Candidate
//@access Private
router.post(
  '/add-candidate',
  [auth, upload.single('image')],
  [
    check('role', 'Role is required').not().isEmpty(),
    check('position', 'Position is required').not().isEmpty(),
    check('firstname', 'Firstname is required').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('age', 'Age is required').not().isEmpty(),
    check('birthdate', 'Birthdate is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('civilstatus', 'Civil Status is required').not().isEmpty(),
    check('citizenship', 'Citizenship is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      role,
      position,
      firstname,
      lastname,
      email,
      password,
      age,
      birthdate,
      address,
      civilstatus,
      citizenship,
    } = req.body;

    const image = req.file ? req.file.filename : null;

    //Build candidate fields object
    const candidateFields = {};
    if (image) candidateFields.image = image;
    if (role) candidateFields.role = role;
    if (position) candidateFields.position = position;
    if (firstname) candidateFields.firstname = firstname;
    if (lastname) candidateFields.lastname = lastname;
    if (email) candidateFields.email = email;
    if (password) candidateFields.password = password;
    if (age) candidateFields.age = age;
    if (birthdate) candidateFields.birthdate = birthdate;
    if (address) candidateFields.address = address;
    if (civilstatus) candidateFields.civilstatus = civilstatus;
    if (citizenship) candidateFields.citizenship = citizenship;

    try {
      let candidate = await Candidate.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Candidate already exists' }] });
      }

      //Create Candidate
      candidate = new Candidate(candidateFields);

      const salt = await bcrypt.genSalt(10);

      candidate.password = await bcrypt.hash(password, salt);

      await candidate.save();

      //Return token
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
          res.json({ candidate, token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status.send('Server Error');
    }
  }
);

// @route    Update api/admins/update-user/:user_id
// @access   Private
router.put(
  '/update-user/:user_id',
  [auth, upload.single('image')],
  checkObjectId('user_id'),
  [
    check('role', 'Role is required').not().isEmpty(),
    check('firstname', 'Firstname is required').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('age', 'Age is required').not().isEmpty(),
    check('birthdate', 'Birthdate is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('civilstatus', 'Civil Status is required').not().isEmpty(),
    check('citizenship', 'Citizenship is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      role,
      firstname,
      lastname,
      email,
      age,
      birthdate,
      address,
      civilstatus,
      citizenship,
    } = req.body;

    const image = req.file ? req.file.filename : null;

    //Build candidate fields object
    const userFields = {};
    if (image) userFields.image = image;
    if (role) userFields.role = role;
    if (firstname) userFields.firstname = firstname;
    if (lastname) userFields.lastname = lastname;
    if (email) userFields.email = email;
    if (age) userFields.age = age;
    if (birthdate) userFields.birthdate = birthdate;
    if (address) userFields.address = address;
    if (civilstatus) userFields.civilstatus = civilstatus;
    if (citizenship) userFields.citizenship = citizenship;

    try {
      // Using upsert option (creates new doc if no match is found):
      let user = await User.findOneAndUpdate(
        { _id: req.params.user_id },
        { $set: userFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    Update api/admins/update-candidate/:candidate_id
// @access   Private
router.put(
  '/update-candidate/:candidate_id',
  [auth, upload.single('image')],
  checkObjectId('candidate_id'),
  [
    check('role', 'Role is required').not().isEmpty(),
    check('position', 'Position is required').not().isEmpty(),
    check('firstname', 'Firstname is required').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('age', 'Age is required').not().isEmpty(),
    check('birthdate', 'Birthdate is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('civilstatus', 'Civil Status is required').not().isEmpty(),
    check('citizenship', 'Citizenship is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      role,
      position,
      firstname,
      lastname,
      email,
      age,
      birthdate,
      address,
      civilstatus,
      citizenship,
    } = req.body;

    const image = req.file ? req.file.filename : null;

    //Build candidate fields object
    const candidateFields = {};
    if (image) candidateFields.image = image;
    if (role) candidateFields.role = role;
    if (position) candidateFields.position = position;
    if (firstname) candidateFields.firstname = firstname;
    if (lastname) candidateFields.lastname = lastname;
    if (email) candidateFields.email = email;
    if (age) candidateFields.age = age;
    if (birthdate) candidateFields.birthdate = birthdate;
    if (address) candidateFields.address = address;
    if (civilstatus) candidateFields.civilstatus = civilstatus;
    if (citizenship) candidateFields.citizenship = citizenship;

    try {
      // Using upsert option (creates new doc if no match is found):
      let candidate = await Candidate.findOneAndUpdate(
        { _id: req.params.candidate_id },
        { $set: candidateFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(candidate);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    DELETE api/admins/delete-user/:user_id
// @access   Private
router.delete(
  '/delete-user/:user_id',
  auth,
  checkObjectId('user_id'),
  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.user_id);
      if (!user) {
        return res.status(400).json('User Not Found');
      }
      res.status(200).json('User Deleted Successfully');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    DELETE api/admins/delete-candidate/:candidate_id
// @access   Private
router.delete(
  '/delete-candidate/:candidate_id',
  auth,
  checkObjectId('candidate_id'),
  async (req, res) => {
    try {
      const candidate = await Candidate.findByIdAndDelete(
        req.params.candidate_id
      );
      if (!candidate) {
        return res.status(400).json('Candidate Not Found');
      }
      res.status(200).json('Candidate Deleted Successfully');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// Route to get a specific image by ID
router.get('/image/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).send('Candidate not found');
    }

    res.send(candidate.data);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

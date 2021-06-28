const User = require('../models/user');
var express = require('express');
var router = express.Router();
const {
  signup,
  signin,
  signout,
  isSignIn,
  isAuthenticated,
} = require('../controllers/auth');
const { check } = require('express-validator');

router.post(
  '/signup',
  check('name')
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 chars long'),
  check('email').isEmail().withMessage('email is not correct'),
  check('password')
    .isLength({ min: 5 })
    .withMessage('password must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('password must contain a number'),
  signup
);

router.post(
  '/signin',
  check('email').isEmail().withMessage('email is not correct'),
  check('password').isLength({ min: 1 }).withMessage('Password is required'),
  signin
);

router.get('/signout', signout);

router.get('/test/:id', isSignIn, (req, res) => {
  User.findById(req.params.id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No user was found in DB',
      });
    }
    req.profile = user;
    res.send(req.profile);
  });
});

module.exports = router;

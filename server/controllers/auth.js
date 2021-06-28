const User = require('../models/user');
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: 'Not able to save user in DB',
      });
    }

    res.json({
      name: user.name,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email doesn't exist",
      });
    }

    if (!user.authenticate(password)) {
      return res
        .status(401)
        .json({ error: "Email and password doesn't match" });
    }

    //create token using user's id
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    //store token in browser cookie
    res.cookie('token', token, { expire: new Date() + 9999 });

    //sending response to frontend
    const { _id, name, email, role } = user;
    res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('token'); //method comes from cookie-parser
  res.json({ message: 'user signout succesfully' });
};

//protected routes
exports.isSignIn = expressJWT({
  secret: process.env.TOKEN_SECRET,
  userProperty: 'auth',
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: 'ACCESS DENIED',
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You're not admin",
    });
  }
  next();
};

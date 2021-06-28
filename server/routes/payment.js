const express = require('express');
const router = express.Router();

const { isSignIn, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const { getToken, processPayment } = require('../controllers/payment');

router.get(
  '/payment/gettoken/:userId',
  isSignIn,
  getUserById,
  isAuthenticated,
  getToken
);

router.post(
  '/payment/braintree/:userId',
  isSignIn,
  getUserById,
  isAuthenticated,
  processPayment
);

module.exports = router;

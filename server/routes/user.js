var express = require('express');
var router = express.Router();
const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require('../controllers/user');
const { isSignIn, isAuthenticated, isAdmin } = require('../controllers/auth');

//getUserById middleware is called before isAuthenticated bcz we're setting req.profile = user;
// otherwise it will show req.profile is undefined
router.get('/user/:userId', isSignIn, getUserById, isAuthenticated, getUser);

router.put('/user/:userId', isSignIn, getUserById, isAuthenticated, updateUser);

router.get(
  '/user/:userId/orders',
  isSignIn,
  getUserById,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;

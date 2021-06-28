const express = require('express');
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  removeCategory,
} = require('../controllers/category');
const { isSignIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

//create route
router.post(
  '/category/create/:userId',
  isSignIn,
  getUserById,
  isAuthenticated,
  isAdmin,
  createCategory
);

//read routes
router.get('/category/:categoryId', getCategoryById, getCategory);
router.get('/categories', getAllCategory);

//update route
router.put(
  '/category/:categoryId/:userId',
  isSignIn,
  getUserById,
  isAuthenticated,
  isAdmin,
  getCategoryById,
  updateCategory
);

//delete route
router.delete(
  '/category/:categoryId/:userId',
  isSignIn,
  getUserById,
  isAuthenticated,
  isAdmin,
  getCategoryById,
  removeCategory
);

module.exports = router;

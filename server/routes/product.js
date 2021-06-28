const express = require('express');
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require('../controllers/product');
const { isSignIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

//create route
router.post(
  '/product/create/:userId',
  isSignIn,
  getUserById,
  isAuthenticated,
  isAdmin,
  createProduct
);

//read route
router.get('/product/:productId', getProductById, getProduct);
router.get('/product/photo/:productId', getProductById, photo); //optimisation for binary data

//delete route
router.delete(
  '/product/:productId/:userId',
  isSignIn,
  getUserById,
  isAuthenticated,
  isAdmin,
  getProductById,
  deleteProduct
);

//update route
router.put(
  '/product/:productId/:userId',
  isSignIn,
  getUserById,
  isAuthenticated,
  isAdmin,
  getProductById,
  updateProduct
);

//listing route
router.get('/products', getAllProducts);

router.get('/products/categories', getAllUniqueCategories);

module.exports = router;

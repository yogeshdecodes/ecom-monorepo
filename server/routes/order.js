const express = require('express');
const router = express.Router();

const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateOrderStatus,
} = require('../controllers/order');
const { isSignIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user');
const { updateInventory } = require('../controllers/product');

router.post(
  '/order/create/:userId',
  isSignIn,
  getUserById,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateInventory,
  createOrder
);

router.get(
  '/order/all/:orderId',
  isSignIn,
  getUserById,
  isAuthenticated,
  getOrderById,
  getAllOrders
);

router.put(
  '/order/:orderId/status/:userId',
  isSignIn,
  getUserById,
  isAuthenticated,
  isAdmin,
  getOrderById,
  updateOrderStatus
);

router.get(
  '/order/status/:userId',
  isSignIn,
  getUserById,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);

module.exports = router;

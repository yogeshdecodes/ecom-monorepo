const { ProductCart, Order } = require('../models/order');

exports.getOrderById = (req, res, next) => {
  Order.findById(req.params.userId)
    .populate('products.product', 'name price') //doubt products.product
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: 'No order found in DB',
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      res.status(400).json({
        error: 'failed to save in DB',
      });
    }
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate('user', '_id name')
    .exec((err, orders) => {
      if (err) {
        res.status(400).json({
          error: 'no order found in DB',
        });
      }
      res.json(orders);
    });
};

exports.updateOrderStatus = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: 'Cannot update order status',
        });
      }
      res.json(order);
    }
  );
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path('status').enumValues);
};

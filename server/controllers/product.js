const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.getProductById = (req, res, next) => {
  Product.findById(req.params.productId)
    .populate('category')
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: 'no product found in DB',
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  const form = formidable({ keepExtensions: true });

  form.parse(req, (err, fields, file) => {
    // console.log('fields:', fields); //fields are given by frontend based on product model
    // console.log('file:', file);     //file is format inside postman instead of text in form-data that stores local system media's path,size,type
    if (err) {
      return res.status(400).json({
        error: 'problem with image',
      });
    }

    const { name, description, price, category, stock } = fields;

    //we can also use express validator for restriction on fields
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ error: 'please include all  fields' });
    }
    let product = new Product(fields);
    // console.log(product);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 2 * 1024 * 1024) {
        // file shoule less than 2Mb
        return res.status(400).json({
          error: 'File size too big!',
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({ error: 'saving tshirt in DB failed' });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined; //optimisation for binary data
  return res.json(req.product);
};

//middleware to deal photo separately using productID from frontend
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.json(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res
        .status(400)
        .json({ error: `failed to delete product ${deletedProduct.name}` });
    }
    res.json({
      message: `deletion of ${deletedProduct.name} is successful`,
    });
  });
};

exports.updateProduct = (req, res) => {
  const form = formidable({ keepExtensions: true });

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: 'problem with image',
      });
    }

    let product = req.product;
    product = _.extend(product, fields); //update already existing fields with new fields passing through FE

    //handle file here
    if (file.photo) {
      if (file.photo.size > 2 * 1024 * 1024) {
        // file shoule less than 2Mb
        return res.status(400).json({
          error: 'File size too big!',
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({ error: 'Updation in DB failed' });
      }
      res.json(product);
    });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8; //from frontend using question mark? but since it is string we can parse it to integer value
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  Product.find()
    .select('-photo') //not select photo during loading
    .populate('category')
    .sort([[sortBy, 'asc']]) // .sort([['updatedAt', 'descending']})
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: 'No product found',
        });
      }
      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct('category', {}, (err, categories) => {
    if (err) {
      res.status(400).json({ error: 'no category found' });
    }
    res.json(categories);
  });
};

exports.updateInventory = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });
  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      res.status(400).json({
        error: 'bulk operation failed',
      });
    }
    next();
  });
};

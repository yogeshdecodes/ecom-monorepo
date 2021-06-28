const Category = require('../models/category');

exports.getCategoryById = (req, res, next) => {
  Category.findById(req.params.categoryId).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: 'No category was found in DB',
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        err: 'Not able to save category in DB',
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({ error: 'No categories found' });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({ error: 'Failed to update category' });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, removedCategory) => {
    if (err) {
      return res.status(400).json({
        error: 'failed to delete category',
      });
    }
    res.json({
      message: `category ${category.name} succesfully deleted`,
    });
  });
};

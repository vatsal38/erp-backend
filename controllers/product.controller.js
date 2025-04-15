const Product = require("../models/product.model");

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res
    .status(201)
    .json({
      success: true,
      message: "Product created successfully.",
      data: product,
    });
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json({
    success: true,
    message: "Products retrieved successfully.",
    data: products,
  });
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({
    success: true,
    message: "Product update successfully.",
    data: product,
  });
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Product deleted successfully." });
};

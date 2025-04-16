const Product = require("../models/product.model");

exports.createProduct = async (req, res) => {
  const { name, sku, description, quantityAvailable, category, unitPrice } =
    req.body;

  const product = await Product.create({
    name,
    sku,
    description,
    quantityAvailable,
    category,
    unitPrice,
  });

  res.status(201).json({
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
    runValidators: true,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    message: "Product updated successfully.",
    data: product,
  });
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({ success: true, message: "Product deleted successfully." });
};

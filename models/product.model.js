const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: String,
    sku: String,
    description: String,
    quantityAvailable: Number,
    category: String,
    unitPrice: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);

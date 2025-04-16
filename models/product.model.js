const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    quantityAvailable: { type: Number, required: true, min: 0, default: 0 },
    category: { type: String, required: false },
    unitPrice: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);

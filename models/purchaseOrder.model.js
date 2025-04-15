const mongoose = require("mongoose");
const PurchaseOrderSchema = new mongoose.Schema(
  {
    supplierName: String,
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Confirmed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("PurchaseOrder", PurchaseOrderSchema);

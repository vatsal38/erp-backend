const mongoose = require("mongoose");
const PurchaseOrderSchema = new mongoose.Schema(
  {
    supplierName: String,
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Confirmed"],
      default: "Pending",
    },
    totalAmount: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("PurchaseOrder", PurchaseOrderSchema);

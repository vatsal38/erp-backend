const PurchaseOrder = require("../models/purchaseOrder.model");
const Product = require("../models/product.model");

exports.createPO = async (req, res) => {
  const { supplierName, products } = req.body;
  let total = 0;
  for (const item of products) {
    const prod = await Product.findById(item.product);
    total += item.quantity * prod.unitPrice;
  }

  const po = await PurchaseOrder.create({
    supplierName,
    products,
    totalAmount: total,
  });
  console.log("total::: ", total);
  res
    .status(201)
    .json({ success: true, message: "Purchase order created.", data: po });
};

exports.getPOs = async (req, res) => {
  const pos = await PurchaseOrder.find().populate("products.product");
  res.json({ success: true, message: "Purchase order retrieved.", data: pos });
};

exports.confirmPO = async (req, res) => {
  const po = await PurchaseOrder.findById(req.params.id);
  if (!po) return res.status(404).json({ message: "PO not found" });

  for (let item of po.products) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { quantityAvailable: item.quantity },
    });
  }
  po.status = "Confirmed";
  await po.save();
  res.json({ success: true, message: "Purchase order confirmed.", data: po });
};

exports.updatePO = async (req, res) => {
  const { products, supplierName } = req.body;

  let total = 0;
  for (const item of products) {
    const prod = await Product.findById(item.product);
    if (!prod)
      return res
        .status(400)
        .json({ success: false, message: "Invalid product in request" });

    total += item.quantity * prod.unitPrice;
  }

  const po = await PurchaseOrder.findByIdAndUpdate(
    req.params.id,
    {
      products,
      supplierName,
      totalAmount: total,
    },
    { new: true }
  );

  res.json({
    success: true,
    message: "Purchase order updated successfully.",
    data: po,
  });
};

exports.deletePO = async (req, res) => {
  await PurchaseOrder.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Purchase order deleted successfully." });
};

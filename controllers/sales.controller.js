const Sales = require("../models/sales.model");
const Product = require("../models/product.model");
const Customer = require("../models/customer.model");
const { generateInvoice } = require("../utils/pdfGenerator");

exports.createSales = async (req, res) => {
  const { customer, products } = req.body;

  let total = 0;
  for (const item of products) {
    const prod = await Product.findById(item.product);
    if (!prod || prod.quantityAvailable < item.quantity)
      return res
        .status(400)
        .json({ success: false, message: "Stock unavailable" });
    total += item.quantity * prod.unitPrice;
  }

  const sale = await Sales.create({ customer, products, totalAmount: total });
  res
    .status(201)
    .json({ success: true, message: "Bill created successfully.", data: sale });
};

exports.getSales = async (req, res) => {
  const sales = await Sales.find()
    .populate("customer")
    .populate("products.product");
  res.json({
    success: true,
    message: "Sales retrieved successfully.", 
    data: sales,
  });
};

exports.updateSalesStatus = async (req, res) => {
  const sale = await Sales.findById(req.params.id);
  if (!sale)
    return res.status(404).json({ success: false, message: "Sale not found" });

  const { status } = req.body;
  if (status === "Confirmed") {
    for (const item of sale.products) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { quantityAvailable: -item.quantity },
      });
    }
  }
  sale.status = status;
  await sale.save();
  res.json({
    success: true,
    message: "Status updated successfully.",
    data: sale,
  });
};

exports.getInvoice = async (req, res) => {
  const sale = await Sales.findById(req.params.id).populate("products.product");
  const customer = await Customer.findById(sale.customer);
  if (!sale || !customer) return res.status(404).json({ message: "Not found" });

  const mappedSale = {
    ...sale._doc,
    products: sale.products.map((p) => ({
      name: p.product.name,
      quantity: p.quantity,
      unitPrice: p.unitPrice || p.product.unitPrice,
    })),
  };

  generateInvoice(mappedSale, customer, res);
};

exports.updateSales = async (req, res) => {
  const sales = await Sales.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({
    success: true,
    message: "Bill update successfully.",
    data: sales,
  });
};

exports.deleteSales = async (req, res) => {
  await Sales.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Bill deleted successfully." });
};

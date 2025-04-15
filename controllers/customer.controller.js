const Customer = require("../models/customer.model");

exports.createCustomer = async (req, res) => {
  const customer = await Customer.create(req.body);
  res.status(201).json({
    success: true,
    message: "Customer created successfully.",
    data: customer,
  });
};

exports.getCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.json({
    success: true,
    message: "Customers retrieved successfully.",
    data: customers,
  });
};

exports.getCustomer = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.json({
    success: true,
    message: "Customer retrieved successfully.",
    data: customer,
  });
};

exports.updateCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({
    success: true,
    message: "Customer update successfully.",
    data: customer,
  });
};

exports.deleteCustomer = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Customer deleted successfully." });
};

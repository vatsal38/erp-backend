const Customer = require("../models/customer.model");

exports.createCustomer = async (req, res) => {
  const { name, email, phone, address } = req.body;

  const emailRegex = /.+\@.+\..+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format.",
    });
  }

  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Phone must be 10 digits.",
    });
  }

  const customer = await Customer.create({ name, email, phone, address });

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
  if (!customer) {
    return res
      .status(404)
      .json({ success: false, message: "Customer not found" });
  }

  res.json({
    success: true,
    message: "Customer retrieved successfully.",
    data: customer,
  });
};

exports.updateCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!customer) {
    return res
      .status(404)
      .json({ success: false, message: "Customer not found" });
  }

  res.json({
    success: true,
    message: "Customer updated successfully.",
    data: customer,
  });
};

exports.deleteCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) {
    return res
      .status(404)
      .json({ success: false, message: "Customer not found" });
  }
  res.json({ success: true, message: "Customer deleted successfully." });
};

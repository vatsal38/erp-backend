const Sale = require("../models/sales.model");

exports.getSummary = async (req, res) => {
  try {
    const confirmedSales = await Sale.find({ status: "Confirmed" }).populate(
      "products.product"
    );
    const cancelledSales = await Sale.countDocuments({ status: "Cancelled" });
    const pendingSales = await Sale.countDocuments({ status: "Pending" });

    const totalSales = confirmedSales.length + cancelledSales + pendingSales;

    let totalRevenue = 0;

    confirmedSales.forEach((sale) => {
      sale.products.forEach((item) => {
        const unitPrice = item.product?.unitPrice || 0;
        const quantity = item.quantity || 0;
        totalRevenue += unitPrice * quantity;
      });
    });

    res.json({
      totalSales,
      confirmedSales: confirmedSales.length,
      cancelledSales,
      pendingSales,
      totalRevenue,
    });
  } catch (error) {
    console.error("Error in getSummary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

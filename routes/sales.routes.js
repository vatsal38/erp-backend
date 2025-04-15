const express = require("express");
const router = express.Router();
const salesController = require("../controllers/sales.controller");

router.post("/", salesController.createSales);
router.get("/", salesController.getSales);
router.put("/:id/status", salesController.updateSalesStatus);
router.get("/:id/invoice", salesController.getInvoice);
router.put("/:id", salesController.updateSales);
router.delete("/:id", salesController.deleteSales);

module.exports = router;

const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");
const { authorizeRoles } = require("../middleware/auth");

router.post("/", customerController.createCustomer);
router.get("/", customerController.getCustomers);
router.get("/:id", customerController.getCustomer);
router.put("/:id", authorizeRoles("admin"), customerController.updateCustomer);
router.delete(
  "/:id",
  authorizeRoles("admin"),
  customerController.deleteCustomer
);

module.exports = router;

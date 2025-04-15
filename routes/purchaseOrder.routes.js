const express = require("express");
const router = express.Router();
const controller = require("../controllers/purchaseOrder.controller");
const { authorizeRoles } = require("../middleware/auth");

router.post("/", authorizeRoles("admin"), controller.createPO);
router.get("/", authorizeRoles("admin"), controller.getPOs);
router.put("/:id", authorizeRoles("admin"), controller.updatePO);
router.patch("/:id/confirm", authorizeRoles("admin"), controller.confirmPO);
router.delete("/:id", authorizeRoles("admin"), controller.deletePO);

module.exports = router;

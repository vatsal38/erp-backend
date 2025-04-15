const express = require("express");
const router = express.Router();
const { authorizeRoles } = require("../middleware/auth");
const productController = require("../controllers/product.controller");

router.post("/", authorizeRoles("admin"), productController.createProduct);
router.get("/", productController.getAllProducts);
router.put("/:id", authorizeRoles("admin"), productController.updateProduct);
router.delete("/:id", authorizeRoles("admin"), productController.deleteProduct);

module.exports = router;

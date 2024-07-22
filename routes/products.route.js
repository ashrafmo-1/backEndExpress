const express = require("express");
const router = express.Router();
// handle controllers;
const verifyToken = require("../middlewares/ProtectedFunction");
const ProductController = require("../controllers/products.controllers");

router.get("/showAllProducts", verifyToken, ProductController.showAllProducts); // handle controllers
router.get("/showSingleProducts/:id", verifyToken, ProductController.showSingleUser);
router.post("/addNewProducts", verifyToken, ProductController.addNewProduct);
router.patch("/updateProduct/:id", verifyToken, ProductController.updateProduct);
router.delete("/deleteProduct/:id", verifyToken, ProductController.removeProduct);

module.exports = router;
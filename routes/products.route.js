const express = require("express");
const router = express.Router();
// handle controllers;
const verifyToken = require("../middlewares/ProtectedFunction");


router.get("/showAllProducts", verifyToken, ); // handle controllers
router.get("/showSingleProducts/:id", verifyToken); // handle controllers
router.post("/addNewProducts", verifyToken);
router.patch("/updateProduct/:id", verifyToken);
router.delete("/deleteProduct/:id", verifyToken);

module.exports = router;
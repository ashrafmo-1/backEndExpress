const express = require("express");
const router = express.Router();
let userController = require("../controllers/users.controls");
const verifyToken = require("../middlewares/ProtectedFunction");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.route('/').get(verifyToken, userController.getAllUsers);
router.get(`/:userId`, userController.getSingleUser);
router.delete("/:userId", userController.delUser);
router.patch("/:userId", userController.chanageUser); // check

module.exports = router;
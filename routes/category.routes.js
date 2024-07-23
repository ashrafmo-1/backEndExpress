const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/ProtectedFunction");

router.route('/').get(verifyToken);
router.route('/AddCategory').post(verifyToken);

module.exports = router;
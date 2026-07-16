const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const { validateKey } = require("../controllers/validateController");

router.use(protect);
router.post("/", validateKey);

module.exports = router;

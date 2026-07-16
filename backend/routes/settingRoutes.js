const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  getSettings,
  updateSettings,
} = require("../controllers/settingController");

router.use(protect); // All setting routes require authentication

router.get("/", getSettings);
router.put("/", updateSettings);

module.exports = router;

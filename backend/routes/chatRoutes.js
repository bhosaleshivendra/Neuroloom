const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  getMessages,
  sendMessage,
} = require("../controllers/chatController");

router.use(protect); // All chat routes require authentication

router.get("/", getMessages);
router.post("/", sendMessage);

module.exports = router;

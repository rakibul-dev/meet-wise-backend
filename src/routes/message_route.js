const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../modules/message/MessageController.js");
const router = express.Router();

router.post("/send-message", sendMessage);
router.get("/messages/:conversationId", getMessages);
module.exports = router;

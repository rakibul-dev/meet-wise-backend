const express = require("express");
const {
  getConversations,
  createConversation,
} = require("../modules/conversation/ConversationController");
const router = express.Router();

router.get("/conversations", getConversations);

router.post("/conversations", createConversation);

module.exports = router;

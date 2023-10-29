const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  lastMessage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Conversation", ConversationSchema);

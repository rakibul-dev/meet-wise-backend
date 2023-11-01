const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");
const Schema = mongoose.Schema;

const MessegeSchema = Schema(
  {
    sender: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    reciver: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    conversation: {
      type: ObjectId,
      ref: "Conversation",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Messege", MessegeSchema);

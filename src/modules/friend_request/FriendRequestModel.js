const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");
const Schema = mongoose.Schema;

const FriendRequestSchema = Schema(
  {
    senderId: {
      type: ObjectId,
      ref: "User",
    },
    reciverId: {
      type: ObjectId,
      ref: "User",
    },
    status: {
      type: ["pending", "acepted", "rejected", "blocked"],
      default: "pending",
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("FriendRequest", FriendRequestSchema);

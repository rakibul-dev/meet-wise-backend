const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");
const Schema = mongoose.Schema;

// const FriendSchema = Schema({
//   friends: [
//     {
//       type: ObjectId,
//       ref: "User",
//     },
//   ],
//   user: {
//     type: ObjectId,
//     ref: "User",
//   },
// });
const FriendSchema = Schema({
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
});

module.exports = mongoose.model("Friends", FriendSchema);
